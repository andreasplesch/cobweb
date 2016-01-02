
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Texturing/X3DTextureCoordinateNode",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureCoordinateNode, 
          X3DConstants)
{
"use strict";

	function TextureCoordinate (executionContext)
	{
		X3DTextureCoordinateNode .call (this, executionContext .getBrowser (), executionContext);

		this .addType (X3DConstants .TextureCoordinate);
	}

	TextureCoordinate .prototype = $.extend (Object .create (X3DTextureCoordinateNode .prototype),
	{
		constructor: TextureCoordinate,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec2f ()),
		]),
		getTypeName: function ()
		{
			return "TextureCoordinate";
		},
		getComponentName: function ()
		{
			return "Texturing";
		},
		getContainerField: function ()
		{
			return "texCoord";
		},
		addTexCoordToChannel: function (texCoords, index)
		{
			if (index >= 0 && index < this .point_ .length)
			{
				var point = this .point_ [index];
	
				texCoords .push (point .x, point .y, 0, 1);
			}
			else
				texCoords .push (0, 0, 0, 1);

		},
	});

	return TextureCoordinate;
});


