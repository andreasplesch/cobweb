
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Basic/X3DBaseNode",
	"cobweb/Bits/X3DConstants",
	"cobweb/Browser/Core/PrimitiveQuality",
	"cobweb/Browser/Core/TextureQuality",
	"lib/dataStorage",
	"lib/gettext",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DBaseNode,
          X3DConstants,
          PrimitiveQuality,
          TextureQuality,
          dataStorage,
          _)
{
	with (Fields)
	{
		function BrowserOptions (executionContext)
		{
			X3DBaseNode .call (this, executionContext .getBrowser (), executionContext);

			this .addAlias ("AntiAliased", this .Antialiased_);

			this .primitiveQuality = PrimitiveQuality .MEDIUM;
			this .textureQuality   = TextureQuality   .MEDIUM;
		}

		BrowserOptions .prototype = $.extend (Object .create (X3DBaseNode .prototype),
		{
			constructor: BrowserOptions,
			fieldDefinitions: new FieldDefinitionArray ([
				new X3DFieldDefinition (X3DConstants .inputOutput, "SplashScreen",           new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .inputOutput, "Dashboard",              new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .inputOutput, "Rubberband",             new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .inputOutput, "EnableInlineViewpoints", new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .inputOutput, "Antialiased",            new SFBool (true)),
				new X3DFieldDefinition (X3DConstants .inputOutput, "TextureQuality",         new SFString ("MEDIUM")),
				new X3DFieldDefinition (X3DConstants .inputOutput, "PrimitiveQuality",       new SFString ("MEDIUM")),
				new X3DFieldDefinition (X3DConstants .inputOutput, "QualityWhenMoving",      new SFString ("MEDIUM")),
				new X3DFieldDefinition (X3DConstants .inputOutput, "Shading",                new SFString ("GOURAUD")),
				new X3DFieldDefinition (X3DConstants .inputOutput, "MotionBlur",             new SFBool ()),
				new X3DFieldDefinition (X3DConstants .inputOutput, "Gravity",                new SFFloat (9.80665)),
			]),
			getTypeName: function ()
			{
				return "BrowserOptions";
			},
			getComponentName: function ()
			{
				return "Cobweb";
			},
			getContainerField: function ()
			{
				return "browserOptions";
			},
			initialize: function ()
			{
				X3DBaseNode .prototype .initialize .call (this);
				
				this .Rubberband_                .addInterest (this, "set_rubberband__");
				this .PrimitiveQuality_          .addInterest (this, "set_primitiveQuality__");
				this .TextureQuality_            .addInterest (this, "set_textureQuality__");
				this .Shading_                   .addInterest (this, "set_shading__");
				this .getBrowser () .shutdown () .addInterest (this, "set_shutdown__");

				this .configure ();
			},
			configure: function ()
			{
				var
					rubberband       = dataStorage ["BrowserOptions.Rubberband"],
					primitiveQuality = dataStorage ["BrowserOptions.PrimitiveQuality"],
					textureQuality   = dataStorage ["BrowserOptions.TextureQuality"];
					
				if (rubberband       !== undefined && rubberband       !== this .Rubberband_       .getValue ()) this .Rubberband_       = rubberband;
				if (primitiveQuality !== undefined && primitiveQuality !== this .PrimitiveQuality_ .getValue ()) this .PrimitiveQuality_ = primitiveQuality;
				if (textureQuality   !== undefined && textureQuality   !== this .TextureQuality_   .getValue ()) this .TextureQuality_   = textureQuality;
			},
			getPrimitiveQuality: function ()
			{
				return this .primitiveQuality;
			},
			getTextureQuality: function ()
			{
				return this .textureQuality;
			},
			set_shutdown__: function ()
			{
				var fieldDefinitions = this .getFieldDefinitions ();

				for (var i = 0; i < fieldDefinitions .length; ++ i)
				{
					var
						fieldDefinition = fieldDefinitions [i],
						field           = this .getField (fieldDefinition .name);

					if (! field .equals (fieldDefinition .value))
						field .setValue (fieldDefinition .value);
				}

				this .configure ();
			},
			set_rubberband__: function (rubberband)
			{
				dataStorage ["BrowserOptions.Rubberband"] = rubberband .getValue ();

			   //if (rubberband .getValue ())
			      //this .getBrowser () .getNotification () .string_ = _("Rubberband") + ": " + _("on");
			   //else
					//this .getBrowser () .getNotification () .string_ = _("Rubberband") + ": " + _("off");
			},
			set_primitiveQuality__: function (primitiveQuality)
			{
				dataStorage ["BrowserOptions.PrimitiveQuality"] = primitiveQuality .getValue ();

				var
					cone     = this .getBrowser () .getConeOptions (),
					cylinder = this .getBrowser () .getCylinderOptions (),
					sphere   = this .getBrowser () .getSphereOptions ();

				switch (primitiveQuality .getValue ())
				{
					case "LOW":
						this .primitiveQuality = PrimitiveQuality .LOW;
					
						cone     .vDimension_ = 16;
						cylinder .vDimension_ = 16;

						sphere .uDimension_ = 24;
						sphere .vDimension_ = 12;

						//this .getBrowser () .getNotification () .string_ = _("Primitive Quality") + ": " + _("low");
						break;
					case "HIGH":
						this .primitiveQuality = PrimitiveQuality .HIGH;

						cone     .vDimension_ = 32;
						cylinder .vDimension_ = 32;

						sphere .uDimension_ = 40;
						sphere .vDimension_ = 20;

						//this .getBrowser () .getNotification () .string_ = _("Primitive Quality") + ": " + _("high");
						break;
					default:
						this .primitiveQuality = PrimitiveQuality .MEDIUM;

						cone     .vDimension_ = 20;
						cylinder .vDimension_ = 20;

						sphere .uDimension_ = 32;
						sphere .vDimension_ = 16;

						//this .getBrowser () .getNotification () .string_ = _("Primitive Quality") + ": " + _("medium");
						break;
				}
			},
			set_textureQuality__: function (textureQuality)
			{
				dataStorage ["BrowserOptions.TextureQuality"] = textureQuality .getValue ();

				switch (textureQuality .getValue ())
				{
					case "LOW":
						this .textureQuality = TextureQuality .LOW;
						//this .getBrowser () .getNotification () .string_ = _("Texture Quality") + ": " + _("low");
						break;
					case "HIGH":
						this .textureQuality = TextureQuality .HIGH;
						//this .getBrowser () .getNotification () .string_ = _("Texture Quality") + ": " + _("high");
						break;
					default:
						this .textureQuality = TextureQuality .MEDIUM;
						//this .getBrowser () .getNotification () .string_ = _("Texture Quality") + ": " + _("medium");
						break;
				}
			},
			set_shading__: function (shading)
			{
				this .getBrowser () .setDefaultShader (shading .getValue ());
			},
		});

		return BrowserOptions;
	}
});
