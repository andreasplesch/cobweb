
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Components/Core/X3DNode",
	"cobweb/Components/Core/X3DPrototypeInstance",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DNode,
          X3DPrototypeInstance,
          X3DConstants)
{
	function X3DProtoDeclarationNode (browser, executionContext)
	{
		X3DNode .call (this, browser, executionContext);

		this .addType (X3DConstants .X3DProtoDeclarationNode);
	}

	X3DProtoDeclarationNode .prototype = $.extend (Object .create (X3DNode .prototype),
	{
		constructor: X3DProtoDeclarationNode,
		hasUserDefinedFields: function ()
		{
			return true;
		},
		createInstance: function (setup)
		{
			var instance = new X3DPrototypeInstance (this .getExecutionContext (), this);

			if (setup === undefined)
				instance .setup ();

			return instance;
		},
	});

	return X3DProtoDeclarationNode;
});
