<?php
/**
 * BASED ON https://github.com/scottmac/opengraph/blob/master/OpenGraph.php
 * MODIFIED
 */


/**
 * Class OpenGraph
 */
class OpenGraph{

	/**
	 * Holds all the Open Graph values parsed from a page
	 * @var array
	 */
	private $_values = array();

	/**
	 * Fetches a URI and parses it for Open Graph data, returns
	 * false on error.
	 * @param $URI
	 * @return bool|OpenGraph
	 */
	static public function fetch($URI) {
		$curl = curl_init($URI);

		curl_setopt($curl, CURLOPT_FAILONERROR, true);
		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_TIMEOUT, 15);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

		$response = curl_exec($curl);

		curl_close($curl);

		if (!empty($response)) {
			return self::_parse($response);
		} else {
			return false;
		}
	}

	/**
	 * Parses HTML and extracts Open Graph data
	 * @param $HTML
	 * @return bool|OpenGraph
	 */
	static private function _parse($HTML) {
		// Turning off some errors
		$old_libxml_error = libxml_use_internal_errors(true);

		// Create a new DOM Document to hold the page structure
		$doc = new DOMDocument();

		// Load the url's contents into the DOM
		$doc->loadHTML($HTML);

		// Handle errors
		libxml_use_internal_errors($old_libxml_error);

		// Get all meta tags
		$tags = $doc->getElementsByTagName('meta');
		if (!$tags || $tags->length === 0) {
			return false;
		}

		// New instance
		$page = new self();

		// Default
		$nonOgDescription = null;

		foreach ($tags AS $tag) {
			if ($tag->hasAttribute('property') &&
				strpos($tag->getAttribute('property'), 'og:') === 0) {
				$key = strtr(substr($tag->getAttribute('property'), 3), '-', '_');
				$page->_values[$key] = $tag->getAttribute('content');
			}

			if ($tag ->hasAttribute('value') && $tag->hasAttribute('property') &&
				strpos($tag->getAttribute('property'), 'og:') === 0) {
				$key = strtr(substr($tag->getAttribute('property'), 3), '-', '_');
				$page->_values[$key] = $tag->getAttribute('value');
			}

			if ($tag->hasAttribute('name') && $tag->getAttribute('name') === 'description') {
				$nonOgDescription = $tag->getAttribute('content');
			}

		}

		// og:title not set
		if (!isset($page->_values['title'])) {
			$titles = $doc->getElementsByTagName('title');
			if ($titles->length > 0) {
				$page->_values['title'] = $titles->item(0)->textContent;
			}
		}
		// og:description not set
		if (!isset($page->_values['description']) && $nonOgDescription) {
			$page->_values['description'] = $nonOgDescription;
		}
		// og::image isn't found.
		if (!isset($page->_values['image'])) {
			$domxpath = new DOMXPath($doc);

			// Find node data
			$elements = $domxpath->query("//link[@rel='image_src']");

			if ($elements->length > 0) {
				$domattr = $elements->item(0)->attributes->getNamedItem('href');
				if ($domattr) {
					$page->_values['image'] = $domattr->value;
					$page->_values['image_src'] = $domattr->value;
				}
			} else if (!empty($page->_values['twitter_image'])) {
				$page->_values['image'] = $page->_values['twitter_image'];
			} else {

				$elements = $doc->getElementsByTagName("img");
				foreach ( $elements as $tag ){
					if ($tag->hasAttribute('width') && ( ($tag->getAttribute('width') > 300) || ($tag->getAttribute('width') == '100%') ) ) {
                        $page->_values['image'] = $tag->getAttribute('src');
                        break;
                    } else if (filter_var($tag->getAttribute('src'), FILTER_VALIDATE_URL)) {

                        list($width) = getimagesize($tag->getAttribute('src'));

                        if ($width && $width > 300) {
                            $page->_values['image'] = $tag->getAttribute('src');
                            break;
                        }
                    }
				}

			}

		}

		// Remove invalid types images
		if( isset( $page->_values['image'] ) ) {
			$image = $page->_values['image'];

			// Default
			$imageTypeArray = array(
				0  => 'UNKNOWN',
				1  => 'GIF',
				2  => 'JPEG',
				3  => 'PNG',
				4  => 'SWF',
				5  => 'PSD',
				6  => 'BMP',
				7  => 'TIFF_II',
				8  => 'TIFF_MM',
				9  => 'JPC',
				10 => 'JP2',
				11 => 'JPX',
				12 => 'JB2',
				13 => 'SWC',
				14 => 'IFF',
				15 => 'WBMP',
				16 => 'XBM',
				17 => 'ICO',
				18 => 'COUNT'
			);

			// Allowed
			$allowed_format = array( 'JPEG', 'PNG' );

			// Check the extension is allowed
			if( @getimagesize( $image ) ) {
				list($width, $height, $type, $attr) = getimagesize( $image );
				// TODO: Check for min width or height
				$type_read = $imageTypeArray[$type];
				if( !in_array( $type_read, $allowed_format ) ) {
					$page->_values['image'] = '';
				}
			}
		}

		// No result
		if (empty($page->_values)) { return false; }

		// Return
		return $page;
	}

	/**
	 * Helper method to access attributes directly
	 * Example: $graph->title
	 * @param $key
	 * @return int|mixed|string
	 */
	public function __get($key) {
		if (array_key_exists($key, $this->_values)) {
			return $this->_values[$key];
		}

		if ($key === 'schema') {
			foreach (self::$TYPES AS $schema => $types) {
				if (array_search($this->_values['type'], $types)) {
					return $schema;
				}
			}
		}
	}

}