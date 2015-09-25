
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Rendering/X3DGeometryNode",
	"cobweb/Bits/X3DConstants",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode, 
          X3DConstants,
          Vector2,
          Vector3)
{
	with (Fields)
	{
      var defaultSize = new Vector2 (2, 2);

		function Rectangle2D (executionContext)
		{
			X3DGeometryNode .call (this, executionContext .getBrowser (), executionContext);

			this .addType (X3DConstants .Rectangle2D);
		}

		Rectangle2D .prototype = $.extend (Object .create (X3DGeometryNode .prototype),
		{
			constructor: Rectangle2D,
			fieldDefinitions: new FieldDefinitionArray ([
				new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new SFNode ()),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "size",     new SFVec2f (2, 2)),
				new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new SFBool (true)),
			]),
			getTypeName: function ()
			{
				return "Rectangle2D";
			},
			getComponentName: function ()
			{
				return "Geometry2D";
			},
			getContainerField: function ()
			{
				return "geometry";
			},
			build: function ()
			{
				var
					options = this .getBrowser () .getRectangle2DOptions (),
					size    = this .size_ .getValue ();

				this .setTexCoords (options .getGeometry () .getTexCoords ());
				this .setNormals   (options .getGeometry () .getNormals ());

				if (size .equals (defaultSize))
				{
					this .setVertices (options .getGeometry () .getVertices ());
					this .setExtents  (options .getGeometry () .getExtents ());
				}
				else
				{
					var
						scale           = Vector3 .divide (size, 2),
						x               = scale .x,
						y               = scale .y,
						defaultVertices = options .getGeometry () .getVertices (),
						vertices        = this .getVertices ();

					for (var i = 0; i < defaultVertices .length; i += 4)
					{
						vertices .push (x * defaultVertices [i],
						                y * defaultVertices [i + 1],
						                defaultVertices [i + 2],
						                1);
					}

					this .setVertices (vertices);
					this .setExtents  ([new Vector3 (-x, -y, 1), new Vector3 (x, y, 1)]);	
				}

				this .setSolid (true);
				this .setCurrentTexCoord (null);

				if (! this .solid_ .getValue ())
				   this .addBackFaces ();
			},
			traverse: function (context)
			{
				X3DGeometryNode .prototype .traverse .call (this, context);
			},
		});

		return Rectangle2D;
	}
});

