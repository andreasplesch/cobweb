/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 1999, 2012 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the Cobweb Project.
 *
 * Cobweb is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Cobweb is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Cobweb.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Rendering/X3DLineGeometryNode",
	"cobweb/Bits/X3DCast",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLineGeometryNode, 
          X3DCast,
          X3DConstants)
{
"use strict";

	function IndexedLineSet (executionContext)
	{
		X3DLineGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .IndexedLineSet);

		this .attribNodes  = [ ];
		this .colorNode    = null;
		this .coordNode    = null;
	}

	IndexedLineSet .prototype = $.extend (Object .create (X3DLineGeometryNode .prototype),
	{
		constructor: IndexedLineSet,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "colorIndex",     new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coordIndex",     new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",         new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "color",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",          new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "IndexedLineSet";
		},
		getComponentName: function ()
		{
			return "Rendering";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		initialize: function ()
		{
			X3DLineGeometryNode .prototype .initialize .call (this);

			this .attrib_ .addInterest (this, "set_attrib__");
			this .color_  .addInterest (this, "set_color__");
			this .coord_  .addInterest (this, "set_coord__");

			this .setPrimitiveMode (this .getBrowser () .getContext () .LINES);
			this .setSolid (false);
			
			this .set_attrib__ ();
			this .set_color__ ();
			this .set_coord__ ();
		},
		set_attrib__: function ()
		{
			for (var i = 0; i < this .attribNodes .length; ++ i)
				this .attribNodes [i] .removeInterest (this, "addNodeEvent");

			this .attribNodes .length = 0;

			for (var i = 0, length = this .attrib_ .length; i < length; ++ i)
			{
				var attribNode = X3DCast (X3DConstants .X3DVertexAttributeNode, this .attrib_ [i]);

				if (attribNode)
					this .attribNodes .push (attribNode);
			}

			for (var i = 0; i < this .attribNodes .length; ++ i)
				this .attribNodes [i] .addInterest (this, "addNodeEvent");
		},
		set_color__: function ()
		{
			if (this .colorNode)
			{
				this .colorNode .removeInterest (this, "addNodeEvent");
				this .colorNode .removeInterest (this, "set_transparent__");
			}

			this .colorNode = X3DCast (X3DConstants .X3DColorNode, this .color_);

			if (this .colorNode)
			{
				this .colorNode .addInterest (this, "addNodeEvent");
				this .colorNode .addInterest (this, "set_transparent__");

				this .set_transparent__ ();
			}
			else
				this .transparent_ = false;
		},
		set_transparent__: function ()
		{
			this .transparent_ = this .colorNode .isTransparent ();
		},
		set_coord__: function ()
		{
			if (this .coordNode)
				this .coordNode .removeInterest (this, "addNodeEvent");

			this .coordNode = X3DCast (X3DConstants .X3DCoordinateNode, this .coord_);

			if (this .coordNode)
				this .coordNode .addInterest (this, "addNodeEvent");
		},
		getColorPerVertexIndex: function (index)
		{
			if (index < this .colorIndex_ .length)
				return this .colorIndex_ [index];

			return this .coordIndex_ [index];
		},
		getColorIndex: function (index)
		{
			if (index < this .colorIndex_ .length)
				return this .colorIndex_ [index];

			return index;
		},
		getPolylineIndices: function ()
		{
			var
				coordIndex = this .coordIndex_. getValue (),
				polylines  = [ ],
				polyline   = [ ];

			if (this .coordIndex_ .length)
			{
				var i = 0;

				for (var i = 0; i < coordIndex .length; ++ i)
				{
					var index = coordIndex [i] .getValue ();

					if (index >= 0)
						// Add vertex.
						polyline .push (i);

					else
					{
						// Negativ index.

						if (polyline .length > 1)
						{
							// Add polylines.
							polylines .push (polyline);
						}

						polyline = [ ];
					}
				}

				if (coordIndex [coordIndex .length - 1] .getValue () >= 0)
				{
					if (polyline .length > 1)
						polylines .push (polyline);
				}
			}

			return polylines;
		},
		getPolylines: function (polylines)
		{
			// Polyline map

			polylines .length = 0;
		
			if (! this .coordNode || this .coordNode .isEmpty ())
				return polylines;
		
			var
				polylineIndices = this .getPolylineIndices (),
				coordIndex      = this .coordIndex_. getValue ();

			for (var p = 0; p < polylineIndices .length; ++ p)
			{
				var polyline = polylineIndices [p];

				// Create two vertices for each line.
		
				for (var line = 0, endL = polyline .length - 1; line < endL; ++ line)
				{
					for (var index = line, endI = line + 2; index < endI; ++ index)
					{
						polylines .push (this .coordNode .get1Point (coordIndex [polyline [index]] .getValue ()));
					}
				}
			}
		
			return polylines;
		},
		build: function ()
		{
			if (! this .coordNode || this .coordNode .isEmpty ())
				return;

			var
				coordIndex     = this .coordIndex_. getValue (),
				polylines      = this .getPolylineIndices (),
				colorPerVertex = this .colorPerVertex_ .getValue (),
				colorNode      = this .colorNode,
				coordNode      = this .coordNode;

			// Fill GeometryNode

			var face = 0;

			for (var p = 0; p < polylines .length; ++ p)
			{
				var polyline = polylines [p];
			
				// Create two vertices for each line.

				for (var line = 0, l_end = polyline .length - 1; line < l_end; ++ line)
				{
					for (var index = line, i_end = line + 2; index < i_end; ++ index)
					{
						var i = polyline [index];

						//for (size_t a = 0, size = attribNodes .size (); a < size; ++ a)
						//	attribNodes [a] -> addValue (attribArrays [a], coordIndex () [i]);

						if (colorNode)
						{
							if (colorPerVertex)
								this .addColor (colorNode .get1Color (this .getColorPerVertexIndex (i)));
							else
								this .addColor (colorNode .get1Color (this .getColorIndex (face)));
						}

						this .addVertex (coordNode .get1Point (coordIndex [i] .getValue ()));
					}
				}

				++ face;
			}

			//this .setAttribs (this .attribNodes, attribArrays);
		},
	});

	return IndexedLineSet;
});


