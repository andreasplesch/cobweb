
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Texturing/X3DTextureTransformNode",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureTransformNode, 
          X3DConstants)
{
	with (Fields)
	{
		function MultiTextureTransform (executionContext)
		{
			X3DTextureTransformNode .call (this, executionContext .getBrowser (), executionContext);

			this .addType (X3DConstants .MultiTextureTransform);
		}

		MultiTextureTransform .prototype = $.extend (new X3DTextureTransformNode (),
		{
			constructor: MultiTextureTransform,
			fieldDefinitions: new FieldDefinitionArray ([
				new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new SFNode ()),
				new X3DFieldDefinition (X3DConstants .inputOutput, "textureTransform", new MFNode ()),
			]),
			getTypeName: function ()
			{
				return "MultiTextureTransform";
			},
			getComponentName: function ()
			{
				return "Texturing";
			},
			getContainerField: function ()
			{
				return "textureTransform";
			},
		});

		return MultiTextureTransform;
	}
});

