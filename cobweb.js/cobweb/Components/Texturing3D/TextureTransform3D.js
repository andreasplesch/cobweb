
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
"use strict";

	function TextureTransform3D (executionContext)
	{
		X3DTextureTransformNode .call (this, executionContext .getBrowser (), executionContext);

		this .addType (X3DConstants .TextureTransform3D);
	}

	TextureTransform3D .prototype = $.extend (Object .create (X3DTextureTransformNode .prototype),
	{
		constructor: TextureTransform3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "translation", new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "rotation",    new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "scale",       new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "center",      new Fields .SFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "TextureTransform3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "textureTransform";
		},
	});

	return TextureTransform3D;
});


