function inView(selector, selection, offset) {

	// get nodeList from selector and convert to array
	var scrollOffset = !!offset ? offset : 0,
		selectorNodeList = document.querySelectorAll(selector),
		selectorArray = getArrayFromNodelist(selectorNodeList),
		inviewElements = getMatchingElements();

	function getMatchingElements() {

		// filter non-matching elements
		var filteredElements = selectorArray.filter(function (el) {

			// determine if element is in viewport and parent node is visible as element may not be due to inView implementation. Usually an element itself would be hidden before fading in, whereas if the parent is hidden this will usually be due to another piece of functionality like a set of tabs/carousel etc. inView can be run on callback of tabs/carousel and will match the hidden element
			var parent = el.parentNode,
				inViewport = isElementInViewport(el),
				isVisible = inViewport ? isElementVisible(parent) : false;

			// return if in viewport and visible
			return (inViewport && isVisible);
		});

		return filteredElements;
	}

	// detect element properties
	function isElementInViewport(el) {

		// get boundaries of element and window
		var elClientRect = el.getBoundingClientRect(),
			elHeight = el.offsetHeight,
			elTop = elClientRect.top,
			elBottom = elClientRect.bottom,
			winHeight = window.innerHeight || document.documentElement.clientHeight;

		// return in view based on selection
		switch (selection) {
			case 'top':
				return viewportTop(elTop, elBottom);
			case 'bottom':
				return viewportBottom(elTop, elBottom, elHeight, winHeight);
			case 'inner':
				return viewportInner(elTop, elBottom, winHeight);
			case 'all':
				return viewportAll(elTop, elBottom, elHeight, winHeight);
			default:
				return viewportAll(elTop, elBottom, elHeight, winHeight);
		}
	}
	function isElementVisible(el) {

		// get style properties of element and check element is visible
		var opacity = getStyle(el, 'opacity') === '0',
			display = getStyle(el, 'display') === 'none',
			visibility = getStyle(el, 'visibility') === 'hidden';

		// if element is not visible, return false
		if (opacity || display || visibility) return false;

		// if parent is document node, return true
		if (el.parentNode.nodeType === 9) return true;

		// if parent exists, re-run isElementVisible with parent node to determine if parent is visible
		if (el.parentNode) return isElementVisible(el.parentNode);

		// otherwise element is visible
		return true;
	}

	// calculate element position in viewport
	function viewportTop(elTop, elBottom) {
		return (elTop <= 0 - scrollOffset) && (elBottom >= 0 - scrollOffset);
	}
	function viewportBottom(elTop, elBottom, elHeight, winHeight) {
		return elBottom <= (0 + winHeight + elHeight) && elBottom >= winHeight;
	}
	function viewportAll(elTop, elBottom, elHeight, winHeight) {
		return elTop >= -(elHeight) - scrollOffset && elBottom <= (winHeight + elHeight) - scrollOffset;
	}
	function viewportInner(elTop, elBottom, winHeight) {
		return elTop >= 0 && elBottom <= winHeight;
	}

	// utils
	function getStyle(el, prop) {
		// get style properties
		if (window.getComputedStyle) {
			return document.defaultView.getComputedStyle(el, null)[prop];
		} else if (el.currentStyle) {
			return el.currentStyle[prop];
		}
	}
	function getArrayFromNodelist(nodeList) {
		// create empty array to push to
		var nodeArray = [];
		// loop through each item in the nodeList and add to nodeArray
		for (var i = 0; i < nodeList.length; i++) {
			nodeArray.push(nodeList[i]);
		}
		// return nodeList as array
		return nodeArray;
	}

	// return nodeList of visible elements within the viewport
	return inviewElements;
}
