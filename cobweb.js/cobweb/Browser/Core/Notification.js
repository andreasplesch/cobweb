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
	"cobweb/Fields/SFString",
	"cobweb/Basic/X3DBaseNode",
],
function ($,
          SFString,
          X3DBaseNode)
{
"use strict";
	
	$.fn.textWidth = function (string)
	{
		var children = $(this) .children ();
		var html     = $(this) .html ();
		var span     = '<span>' + html + '</span>';
		$(this) .html (span);
		var width = $(this) .find ('span:first') .width ();
		$(this) .empty ();
		$(this) .append (children);
		return width;
	};

   function Notification (executionContext)
	{
		X3DBaseNode .call (this, executionContext);
	}

	Notification .prototype = $.extend (Object .create (X3DBaseNode .prototype),
	{
		constructor: Notification,
		initialize: function ()
		{
			X3DBaseNode .prototype .initialize .call (this);

			this .addChildObjects ("string", new SFString ());

			this .element = $("<div></div>")
				.addClass ("cobweb-notification")
				.appendTo (this .getBrowser () .getElement () .find (".cobweb-surface"))
				.animate ({ width: 0 });

			$("<span></span>") .appendTo (this .element);

			this .string_ .addInterest ("set_string__", this);
		},
		set_string__: function ()
		{
			if (this .getBrowser () .getBrowserOptions () .getNotifications ())
			{
				if (this .string_ .length === 0)
					return;
	
				//this .element
				//	.text (this .string_ .getValue ())
				//	.stop (true, true)
				//	.fadeIn ()
				//	.animate ({ "delay": 1 }, 4000)
				//	.fadeOut ();
	
				this .element .children () .text (this .string_ .getValue ());
	
				this .element 
					.stop (true, true)
					.fadeIn (0)
					.animate ({ width: this .element .textWidth () })
					.animate ({ "delay": 1 }, 5000)
					.animate ({ width: 0 })
					.fadeOut (0);
			}
		},
	});

	return Notification;
});
