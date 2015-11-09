
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/EventUtilities/X3DTriggerNode",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTriggerNode, 
          X3DConstants)
{
"use strict";

	function BooleanTrigger (executionContext)
	{
		X3DTriggerNode .call (this, executionContext .getBrowser (), executionContext);

		this .addType (X3DConstants .BooleanTrigger);
	}

	BooleanTrigger .prototype = $.extend (Object .create (X3DTriggerNode .prototype),
	{
		constructor: BooleanTrigger,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "set_triggerTime", new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "triggerTrue",     new Fields .SFBool ()),
		]),
		getTypeName: function ()
		{
			return "BooleanTrigger";
		},
		getComponentName: function ()
		{
			return "EventUtilities";
		},
		getContainerField: function ()
		{
			return "children";
		},
	});

	return BooleanTrigger;
});


