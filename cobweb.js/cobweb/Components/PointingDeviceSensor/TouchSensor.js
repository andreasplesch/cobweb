
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/PointingDeviceSensor/X3DTouchSensorNode",
	"cobweb/Bits/X3DConstants",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Matrix4",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTouchSensorNode, 
          X3DConstants,
          Vector2,
          Matrix4)
{
	with (Fields)
	{
		function TouchSensor (executionContext)
		{
			X3DTouchSensorNode .call (this, executionContext .getBrowser (), executionContext);

			this .addType (X3DConstants .TouchSensor);
		}

		TouchSensor .prototype = $.extend (new X3DTouchSensorNode (),
		{
			constructor: TouchSensor,
			fieldDefinitions: new FieldDefinitionArray ([
				new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",            new SFNode ()),
				new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",             new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .inputOutput, "description",         new SFString ("")),
				new X3DFieldDefinition (X3DConstants .outputOnly,  "hitTexCoord_changed", new SFVec2f ()),
				new X3DFieldDefinition (X3DConstants .outputOnly,  "hitNormal_changed",   new SFVec3f ()),
				new X3DFieldDefinition (X3DConstants .outputOnly,  "hitPoint_changed",    new SFVec3f ()),
				new X3DFieldDefinition (X3DConstants .outputOnly,  "isOver",              new SFBool ()),
				new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",            new SFBool ()),
				new X3DFieldDefinition (X3DConstants .outputOnly,  "touchTime",           new SFTime ()),
			]),
			getTypeName: function ()
			{
				return "TouchSensor";
			},
			getComponentName: function ()
			{
				return "PointingDeviceSensor";
			},
			getContainerField: function ()
			{
				return "children";
			},
			set_over__: function (hit, value)
			{
				try
				{
					X3DTouchSensorNode .prototype .set_over__ .call (this, hit, value);

					if (this .isOver_ .getValue ())
					{
						var
							intersection       = hit .intersection,
							modelViewMatrix    = this .getMatrices () [hit .layer .getId ()] .modelViewMatrix,
							invModelViewMatrix = Matrix4 .inverse (modelViewMatrix);

						this .hitTexCoord_changed_ = intersection .texCoord;
						this .hitNormal_changed_   = modelViewMatrix .multMatrixDir (intersection .normal .copy ()) .normalize ();
						this .hitPoint_changed_    = invModelViewMatrix .multVecMatrix (intersection .point .copy ());
					}
				}
				catch (error)
				{
					console .log (error);
				}
			},
		});

		return TouchSensor;
	}
});

