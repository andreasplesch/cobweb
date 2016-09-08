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


define (function ()
{
"use strict";

	return function ($)
	{
		// Use this transport for "binary" data type
		$.ajaxTransport ("+binary", function (options, originalOptions, jqXHR)
		{
			// Check for conditions and support for blob / arraybuffer response type
			if (options .dataType && options .dataType == 'binary')
			{
				return {
					send: function (headers, callback)
					{
						// Setup all variables
						var xhr = options .xhr ();

						xhr .open (options .type, options .url, options .async, options .username, options .password);

						// Apply custom fields if provided
						if ( options.xhrFields )
						{
							for (i in options.xhrFields)
								xhr [i] = options .xhrFields [i];
						}

						// Override mime type if needed
						if (options .mimeType && xhr .overrideMimeType)
							xhr .overrideMimeType (options .mimeType);

						// Setup custom headers
						for (var i in headers)
							xhr .setRequestHeader (i, headers [i]);

						// Setup onload callback
						xhr .onload = function ()
						{
							xhr .onload = xhr .onerror = null;

							var data = { };

							data [options .dataType] = xhr .response;

							callback (xhr .status, xhr .statusText, data, xhr .getAllResponseHeaders ());
						};

						// Setup onerror callback
						xhr.onerror = function ()
						{
							xhr .onload = xhr .onerror = null;

							callback (xhr .status || 404, xhr .statusText);
						};
						
						// Send data
						xhr .responseType = options .responseType || "blob";
						xhr .send (options .hasContent && options .data || null);
					},
					abort: function ()
					{
						var xhr = options .xhr ();

						xhr .onload = xhr .onerror = null;

						xhr .abort ();
					}
				};
			}
		});
	};
});