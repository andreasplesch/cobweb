
define ([
	"jquery",
	"cobweb/Components/Shape/X3DAppearanceChildNode",
	"cobweb/Bits/X3DConstants",
],
function ($,
          X3DAppearanceChildNode, 
          X3DConstants)
{
	function X3DTextureTransformNode (browser, executionContext)
	{
		X3DAppearanceChildNode .call (this, browser, executionContext);

		this .addType (X3DConstants .X3DTextureTransformNode);
	}

	X3DTextureTransformNode .prototype = $.extend (new X3DAppearanceChildNode (),
	{
		constructor: X3DTextureTransformNode,
	});

	return X3DTextureTransformNode;
});

