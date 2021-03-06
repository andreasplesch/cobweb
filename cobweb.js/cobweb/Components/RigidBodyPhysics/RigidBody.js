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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
	"cobweb/Components/Core/X3DNode",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode, 
          X3DConstants)
{
"use strict";

	function RigidBody (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .RigidBody);
	}

	RigidBody .prototype = $.extend (Object .create (X3DNode .prototype),
	{
		constructor: RigidBody,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "angularDampingFactor", new Fields .SFFloat (0.001)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "angularVelocity",      new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "autoDamp",             new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "autoDisable",          new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "centerOfMass",         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "disableAngularSpeed",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "disableLinearSpeed",   new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "disableTime",          new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",              new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "finiteRotationAxis",   new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fixed",                new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "forces",               new Fields .MFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "geometry",             new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "inertia",              new Fields .SFMatrix3f (1, 0, 0, 0, 1, 0, 0, 0, 1)),
		]),
		getTypeName: function ()
		{
			return "RigidBody";
		},
		getComponentName: function ()
		{
			return "RigidBodyPhysics";
		},
		getContainerField: function ()
		{
			return "bodies";
		},
	});

	return RigidBody;
});


