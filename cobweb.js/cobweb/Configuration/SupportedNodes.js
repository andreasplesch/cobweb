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
	"cobweb/Components/Networking/Anchor", // VRML
	"cobweb/Components/Shape/Appearance", // VRML
	"cobweb/Components/Geometry2D/Arc2D",
	"cobweb/Components/Geometry2D/ArcClose2D",
	"cobweb/Components/Sound/AudioClip",
	"cobweb/Components/EnvironmentalEffects/Background", // VRML
	//"cobweb/Components/RigidBodyPhysics/BallJoint",
	"cobweb/Components/Navigation/Billboard", // VRML
	"cobweb/Components/EventUtilities/BooleanFilter",
	"cobweb/Components/EventUtilities/BooleanSequencer",
	"cobweb/Components/EventUtilities/BooleanToggle",
	"cobweb/Components/EventUtilities/BooleanTrigger",
	"cobweb/Components/ParticleSystems/BoundedPhysicsModel",
	"cobweb/Components/Geometry3D/Box", // VRML
	"cobweb/Components/CADGeometry/CADAssembly",
	"cobweb/Components/CADGeometry/CADFace",
	"cobweb/Components/CADGeometry/CADLayer",
	"cobweb/Components/CADGeometry/CADPart",
	"cobweb/Components/Geometry2D/Circle2D",
	"cobweb/Components/Rendering/ClipPlane",
	//"cobweb/Components/RigidBodyPhysics/CollidableOffset",
	//"cobweb/Components/RigidBodyPhysics/CollidableShape",
	"cobweb/Components/Navigation/Collision", // VRML
	//"cobweb/Components/RigidBodyPhysics/CollisionCollection",
	//"cobweb/Components/RigidBodyPhysics/CollisionSensor",
	//"cobweb/Components/RigidBodyPhysics/CollisionSpace",
	"cobweb/Components/Rendering/Color", // VRML
	"cobweb/Components/Followers/ColorChaser",
	"cobweb/Components/Followers/ColorDamper",
	"cobweb/Components/Interpolation/ColorInterpolator", // VRML
	"cobweb/Components/Rendering/ColorRGBA",
	"cobweb/Components/CubeMapTexturing/ComposedCubeMapTexture",
	"cobweb/Components/Shaders/ComposedShader",
	//"cobweb/Components/Texturing3D/ComposedTexture3D",
	"cobweb/Components/Geometry3D/Cone", // VRML
	"cobweb/Components/ParticleSystems/ConeEmitter",
	//"cobweb/Components/RigidBodyPhysics/Contact",
	//"cobweb/Components/NURBS/Contour2D",
	//"cobweb/Components/NURBS/ContourPolyline2D",
	"cobweb/Components/Rendering/Coordinate", // VRML
	"cobweb/Components/Followers/CoordinateChaser",
	"cobweb/Components/Followers/CoordinateDamper",
	"cobweb/Components/NURBS/CoordinateDouble",
	"cobweb/Components/Interpolation/CoordinateInterpolator", // VRML
	"cobweb/Components/Interpolation/CoordinateInterpolator2D",
	"cobweb/Components/Geometry3D/Cylinder", // VRML
	"cobweb/Components/PointingDeviceSensor/CylinderSensor", // VRML
	//"cobweb/Components/DIS/DISEntityManager",
	//"cobweb/Components/DIS/DISEntityTypeMapping",
	"cobweb/Components/Lighting/DirectionalLight", // VRML
	"cobweb/Components/Geometry2D/Disk2D",
	//"cobweb/Components/RigidBodyPhysics/DoubleAxisHingeJoint",
	"cobweb/Components/Interpolation/EaseInEaseOut",
	"cobweb/Components/Geometry3D/ElevationGrid", // VRML
	//"cobweb/Components/DIS/EspduTransform",
	"cobweb/Components/ParticleSystems/ExplosionEmitter",
	"cobweb/Components/Geometry3D/Extrusion", // VRML
	//"cobweb/Components/Shape/FillProperties",
	//"cobweb/Components/Shaders/FloatVertexAttribute",
	"cobweb/Components/EnvironmentalEffects/Fog", // VRML
	//"cobweb/Components/EnvironmentalEffects/FogCoordinate",
	"cobweb/Components/Text/FontStyle", // VRML
	"cobweb/Components/ParticleSystems/ForcePhysicsModel",
	//"cobweb/Components/CubeMapTexturing/GeneratedCubeMapTexture",
	"cobweb/Components/Geospatial/GeoCoordinate",
	"cobweb/Components/Geospatial/GeoElevationGrid",
	"cobweb/Components/Geospatial/GeoLOD",
	"cobweb/Components/Geospatial/GeoLocation",
	"cobweb/Components/Geospatial/GeoMetadata",
	"cobweb/Components/Geospatial/GeoOrigin",
	"cobweb/Components/Geospatial/GeoPositionInterpolator",
	"cobweb/Components/Geospatial/GeoProximitySensor",
	"cobweb/Components/Geospatial/GeoTouchSensor",
	"cobweb/Components/Geospatial/GeoTransform",
	"cobweb/Components/Geospatial/GeoViewpoint",
	"cobweb/Components/Grouping/Group", // VRML
	//"cobweb/Components/H-Anim/HAnimDisplacer",
	//"cobweb/Components/H-Anim/HAnimHumanoid",
	//"cobweb/Components/H-Anim/HAnimJoint",
	//"cobweb/Components/H-Anim/HAnimSegment",
	//"cobweb/Components/H-Anim/HAnimSite",
	//"cobweb/Components/CubeMapTexturing/ImageCubeMapTexture",
	"cobweb/Components/Texturing/ImageTexture", // VRML
	//"cobweb/Components/Texturing3D/ImageTexture3D",
	"cobweb/Components/Geometry3D/IndexedFaceSet", // VRML
	"cobweb/Components/Rendering/IndexedLineSet", // VRML
	"cobweb/Components/CADGeometry/IndexedQuadSet",
	"cobweb/Components/Rendering/IndexedTriangleFanSet",
	"cobweb/Components/Rendering/IndexedTriangleSet",
	"cobweb/Components/Rendering/IndexedTriangleStripSet",
	"cobweb/Components/Networking/Inline", // VRML
	"cobweb/Components/EventUtilities/IntegerSequencer",
	"cobweb/Components/EventUtilities/IntegerTrigger",
	"cobweb/Components/KeyDeviceSensor/KeySensor",
	"cobweb/Components/Navigation/LOD", // VRML
	"cobweb/Components/Layering/Layer",
	"cobweb/Components/Layering/LayerSet",
	"cobweb/Components/Layout/Layout",
	"cobweb/Components/Layout/LayoutGroup",
	"cobweb/Components/Layout/LayoutLayer",
	//"cobweb/Components/Picking/LinePickSensor",
	"cobweb/Components/Shape/LineProperties",
	"cobweb/Components/Rendering/LineSet",
	"cobweb/Components/Networking/LoadSensor",
	"cobweb/Components/EnvironmentalEffects/LocalFog",
	"cobweb/Components/Shape/Material", // VRML
	//"cobweb/Components/Shaders/Matrix3VertexAttribute",
	//"cobweb/Components/Shaders/Matrix4VertexAttribute",
	"cobweb/Components/Core/MetadataBoolean",
	"cobweb/Components/Core/MetadataDouble",
	"cobweb/Components/Core/MetadataFloat",
	"cobweb/Components/Core/MetadataInteger",
	"cobweb/Components/Core/MetadataSet",
	"cobweb/Components/Core/MetadataString",
	//"cobweb/Components/RigidBodyPhysics/MotorJoint",
	"cobweb/Components/Texturing/MovieTexture", // VRML
	//"cobweb/Components/Texturing/MultiTexture",
	//"cobweb/Components/Texturing/MultiTextureCoordinate",
	//"cobweb/Components/Texturing/MultiTextureTransform",
	"cobweb/Components/Navigation/NavigationInfo", // VRML
	"cobweb/Components/Rendering/Normal", // VRML
	"cobweb/Components/Interpolation/NormalInterpolator", // VRML
	//"cobweb/Components/NURBS/NurbsCurve",
	//"cobweb/Components/NURBS/NurbsCurve2D",
	//"cobweb/Components/NURBS/NurbsOrientationInterpolator",
	//"cobweb/Components/NURBS/NurbsPatchSurface",
	//"cobweb/Components/NURBS/NurbsPositionInterpolator",
	//"cobweb/Components/NURBS/NurbsSet",
	//"cobweb/Components/NURBS/NurbsSurfaceInterpolator",
	//"cobweb/Components/NURBS/NurbsSweptSurface",
	//"cobweb/Components/NURBS/NurbsSwungSurface",
	//"cobweb/Components/NURBS/NurbsTextureCoordinate",
	//"cobweb/Components/NURBS/NurbsTrimmedSurface",
	"cobweb/Components/Followers/OrientationChaser",
	"cobweb/Components/Followers/OrientationDamper",
	"cobweb/Components/Interpolation/OrientationInterpolator", // VRML
	"cobweb/Components/Navigation/OrthoViewpoint",
	//"cobweb/Components/Shaders/PackagedShader",
	"cobweb/Components/ParticleSystems/ParticleSystem",
	//"cobweb/Components/Picking/PickableGroup",
	"cobweb/Components/Texturing/PixelTexture", // VRML
	//"cobweb/Components/Texturing3D/PixelTexture3D",
	"cobweb/Components/PointingDeviceSensor/PlaneSensor", // VRML
	"cobweb/Components/ParticleSystems/PointEmitter",
	"cobweb/Components/Lighting/PointLight", // VRML
	//"cobweb/Components/Picking/PointPickSensor",
	"cobweb/Components/Rendering/PointSet", // VRML
	"cobweb/Components/Geometry2D/Polyline2D",
	"cobweb/Components/ParticleSystems/PolylineEmitter",
	"cobweb/Components/Geometry2D/Polypoint2D",
	"cobweb/Components/Followers/PositionChaser",
	"cobweb/Components/Followers/PositionChaser2D",
	"cobweb/Components/Followers/PositionDamper",
	"cobweb/Components/Followers/PositionDamper2D",
	"cobweb/Components/Interpolation/PositionInterpolator", // VRML
	"cobweb/Components/Interpolation/PositionInterpolator2D",
	//"cobweb/Components/Picking/PrimitivePickSensor",
	//"cobweb/Components/Shaders/ProgramShader",
	"cobweb/Components/EnvironmentalSensor/ProximitySensor", // VRML
	"cobweb/Components/CADGeometry/QuadSet",
	//"cobweb/Components/DIS/ReceiverPdu",
	"cobweb/Components/Geometry2D/Rectangle2D",
	//"cobweb/Components/RigidBodyPhysics/RigidBody",
	//"cobweb/Components/RigidBodyPhysics/RigidBodyCollection",
	"cobweb/Components/Followers/ScalarChaser",
	"cobweb/Components/Followers/ScalarDamper",
	"cobweb/Components/Interpolation/ScalarInterpolator", // VRML
	"cobweb/Components/Layout/ScreenFontStyle",
	"cobweb/Components/Layout/ScreenGroup",
	"cobweb/Components/Scripting/Script", // VRML
	"cobweb/Components/Shaders/ShaderPart",
	//"cobweb/Components/Shaders/ShaderProgram",
	"cobweb/Components/Shape/Shape", // VRML
	//"cobweb/Components/DIS/SignalPdu",
	//"cobweb/Components/RigidBodyPhysics/SingleAxisHingeJoint",
	//"cobweb/Components/RigidBodyPhysics/SliderJoint",
	"cobweb/Components/Sound/Sound", // VRML
	"cobweb/Components/Geometry3D/Sphere", // VRML
	"cobweb/Components/PointingDeviceSensor/SphereSensor", // VRML
	"cobweb/Components/Interpolation/SplinePositionInterpolator",
	"cobweb/Components/Interpolation/SplinePositionInterpolator2D",
	"cobweb/Components/Interpolation/SplineScalarInterpolator",
	"cobweb/Components/Lighting/SpotLight", // VRML
	"cobweb/Components/Interpolation/SquadOrientationInterpolator",
	"cobweb/Components/Grouping/StaticGroup",
	//"cobweb/Components/KeyDeviceSensor/StringSensor",
	"cobweb/Components/ParticleSystems/SurfaceEmitter",
	"cobweb/Components/Grouping/Switch", // VRML
	"cobweb/Components/Followers/TexCoordChaser2D",
	"cobweb/Components/Followers/TexCoordDamper2D",
	"cobweb/Components/Text/Text", // VRML
	"cobweb/Components/EnvironmentalEffects/TextureBackground",
	"cobweb/Components/Texturing/TextureCoordinate", // VRML
	"cobweb/Components/Texturing3D/TextureCoordinate3D",
	"cobweb/Components/Texturing3D/TextureCoordinate4D",
	//"cobweb/Components/Texturing/TextureCoordinateGenerator",
	"cobweb/Components/Texturing/TextureProperties",
	"cobweb/Components/Texturing/TextureTransform", // VRML
	"cobweb/Components/Texturing3D/TextureTransform3D",
	"cobweb/Components/Texturing3D/TextureTransformMatrix3D",
	"cobweb/Components/Time/TimeSensor", // VRML
	"cobweb/Components/EventUtilities/TimeTrigger",
	//"cobweb/Components/Titania/TouchGroup",
	"cobweb/Components/PointingDeviceSensor/TouchSensor", // VRML
	"cobweb/Components/Grouping/Transform", // VRML
	"cobweb/Components/EnvironmentalSensor/TransformSensor",
	//"cobweb/Components/DIS/TransmitterPdu",
	"cobweb/Components/Rendering/TriangleFanSet",
	"cobweb/Components/Rendering/TriangleSet",
	"cobweb/Components/Geometry2D/TriangleSet2D",
	"cobweb/Components/Rendering/TriangleStripSet",
	"cobweb/Components/Shape/TwoSidedMaterial",
	//"cobweb/Components/RigidBodyPhysics/UniversalJoint",
	"cobweb/Components/Navigation/Viewpoint", // VRML
	"cobweb/Components/Navigation/ViewpointGroup",
	"cobweb/Components/Layering/Viewport",
	"cobweb/Components/EnvironmentalSensor/VisibilitySensor", // VRML
	"cobweb/Components/ParticleSystems/VolumeEmitter",
	//"cobweb/Components/Picking/VolumePickSensor",
	"cobweb/Components/ParticleSystems/WindPhysicsModel",
	"cobweb/Components/Core/WorldInfo", // VRML
],
function (Anchor,
          Appearance,
          Arc2D,
          ArcClose2D,
          AudioClip,
          Background,
          //BallJoint,
          Billboard,
          BooleanFilter,
          BooleanSequencer,
          BooleanToggle,
          BooleanTrigger,
          BoundedPhysicsModel,
          Box,
          CADAssembly,
          CADFace,
          CADLayer,
          CADPart,
          Circle2D,
          ClipPlane,
          //CollidableOffset,
          //CollidableShape,
          Collision,
          //CollisionCollection,
          //CollisionSensor,
          //CollisionSpace,
          Color,
          ColorChaser,
          ColorDamper,
          ColorInterpolator,
          ColorRGBA,
          ComposedCubeMapTexture,
          ComposedShader,
          //ComposedTexture3D,
          Cone,
          ConeEmitter,
          //Contact,
          //Contour2D,
          //ContourPolyline2D,
          Coordinate,
          CoordinateChaser,
          CoordinateDamper,
          CoordinateDouble,
          CoordinateInterpolator,
          CoordinateInterpolator2D,
          Cylinder,
          CylinderSensor,
          //DISEntityManager,
          //DISEntityTypeMapping,
          DirectionalLight,
          Disk2D,
          //DoubleAxisHingeJoint,
          EaseInEaseOut,
          ElevationGrid,
          //EspduTransform,
          ExplosionEmitter,
          Extrusion,
          //FillProperties,
          //FloatVertexAttribute,
          Fog,
          //FogCoordinate,
          FontStyle,
          ForcePhysicsModel,
          //GeneratedCubeMapTexture,
          GeoCoordinate,
          GeoElevationGrid,
          GeoLOD,
          GeoLocation,
          GeoMetadata,
          GeoOrigin,
          GeoPositionInterpolator,
          GeoProximitySensor,
          GeoTouchSensor,
          GeoTransform,
          GeoViewpoint,
          Group,
          //HAnimDisplacer,
          //HAnimHumanoid,
          //HAnimJoint,
          //HAnimSegment,
          //HAnimSite,
          //ImageCubeMapTexture,
          ImageTexture,
          //ImageTexture3D,
          IndexedFaceSet,
          IndexedLineSet,
          IndexedQuadSet,
          IndexedTriangleFanSet,
          IndexedTriangleSet,
          IndexedTriangleStripSet,
          Inline,
          IntegerSequencer,
          IntegerTrigger,
          KeySensor,
          LOD,
          Layer,
          LayerSet,
          Layout,
          LayoutGroup,
          LayoutLayer,
          //LinePickSensor,
          LineProperties,
          LineSet,
          LoadSensor,
          LocalFog,
          Material,
          //Matrix3VertexAttribute,
          //Matrix4VertexAttribute,
          MetadataBoolean,
          MetadataDouble,
          MetadataFloat,
          MetadataInteger,
          MetadataSet,
          MetadataString,
          //MotorJoint,
          MovieTexture,
          //MultiTexture,
          //MultiTextureCoordinate,
          //MultiTextureTransform,
          NavigationInfo,
          Normal,
          NormalInterpolator,
          //NurbsCurve,
          //NurbsCurve2D,
          //NurbsOrientationInterpolator,
          //NurbsPatchSurface,
          //NurbsPositionInterpolator,
          //NurbsSet,
          //NurbsSurfaceInterpolator,
          //NurbsSweptSurface,
          //NurbsSwungSurface,
          //NurbsTextureCoordinate,
          //NurbsTrimmedSurface,
          OrientationChaser,
          OrientationDamper,
          OrientationInterpolator,
          OrthoViewpoint,
          //PackagedShader,
          ParticleSystem,
          //PickableGroup,
          PixelTexture,
          //PixelTexture3D,
          PlaneSensor,
          PointEmitter,
          PointLight,
          //PointPickSensor,
          PointSet,
          Polyline2D,
          PolylineEmitter,
          Polypoint2D,
          PositionChaser,
          PositionChaser2D,
          PositionDamper,
          PositionDamper2D,
          PositionInterpolator,
          PositionInterpolator2D,
          //PrimitivePickSensor,
          //ProgramShader,
          ProximitySensor,
          QuadSet,
          //ReceiverPdu,
          Rectangle2D,
          //RigidBody,
          //RigidBodyCollection,
          ScalarChaser,
          ScalarDamper,
          ScalarInterpolator,
          ScreenFontStyle,
          ScreenGroup,
          Script,
          ShaderPart,
          //ShaderProgram,
          Shape,
          //SignalPdu,
          //SingleAxisHingeJoint,
          //SliderJoint,
          Sound,
          Sphere,
          SphereSensor,
          SplinePositionInterpolator,
          SplinePositionInterpolator2D,
          SplineScalarInterpolator,
          SpotLight,
          SquadOrientationInterpolator,
          StaticGroup,
          //StringSensor,
          SurfaceEmitter,
          Switch,
          TexCoordChaser2D,
          TexCoordDamper2D,
          Text,
          TextureBackground,
          TextureCoordinate,
          TextureCoordinate3D,
          TextureCoordinate4D,
          //TextureCoordinateGenerator,
          TextureProperties,
          TextureTransform,
          TextureTransform3D,
          TextureTransformMatrix3D,
          TimeSensor,
          TimeTrigger,
          //TouchGroup,
          TouchSensor,
          Transform,
          TransformSensor,
          //TransmitterPdu,
          TriangleFanSet,
          TriangleSet,
          TriangleSet2D,
          TriangleStripSet,
          TwoSidedMaterial,
          //UniversalJoint,
          Viewpoint,
          ViewpointGroup,
          Viewport,
          VisibilitySensor,
          VolumeEmitter,
          //VolumePickSensor,
          WindPhysicsModel,
          WorldInfo)
{
"use strict";

	var supportedNodes =
	{
		// 3.1
		MetadataBool:                 MetadataBoolean,
		// 3.3
		Anchor:                       Anchor,
		Appearance:                   Appearance,
		Arc2D:                        Arc2D,
		ArcClose2D:                   ArcClose2D,
		AudioClip:                    AudioClip,
		Background:                   Background,
		//BallJoint:                    BallJoint,
		Billboard:                    Billboard,
		BooleanFilter:                BooleanFilter,
		BooleanSequencer:             BooleanSequencer,
		BooleanToggle:                BooleanToggle,
		BooleanTrigger:               BooleanTrigger,
		BoundedPhysicsModel:          BoundedPhysicsModel,
		Box:                          Box,
		CADAssembly:                  CADAssembly,
		CADFace:                      CADFace,
		CADLayer:                     CADLayer,
		CADPart:                      CADPart,
		Circle2D:                     Circle2D,
		ClipPlane:                    ClipPlane,
		//CollidableOffset:             CollidableOffset,
		//CollidableShape:              CollidableShape,
		Collision:                    Collision,
		//CollisionCollection:          CollisionCollection,
		//CollisionSensor:              CollisionSensor,
		//CollisionSpace:               CollisionSpace,
		Color:                        Color,
		ColorChaser:                  ColorChaser,
		ColorDamper:                  ColorDamper,
		ColorInterpolator:            ColorInterpolator,
		ColorRGBA:                    ColorRGBA,
		ComposedCubeMapTexture:       ComposedCubeMapTexture,
		ComposedShader:               ComposedShader,
		//ComposedTexture3D:            ComposedTexture3D,
		Cone:                         Cone,
		ConeEmitter:                  ConeEmitter,
		//Contact:                      Contact,
		//Contour2D:                    Contour2D,
		//ContourPolyline2D:            ContourPolyline2D,
		Coordinate:                   Coordinate,
		CoordinateChaser:             CoordinateChaser,
		CoordinateDamper:             CoordinateDamper,
		CoordinateDouble:             CoordinateDouble,
		CoordinateInterpolator:       CoordinateInterpolator,
		CoordinateInterpolator2D:     CoordinateInterpolator2D,
		Cylinder:                     Cylinder,
		CylinderSensor:               CylinderSensor,
		//DISEntityManager:             DISEntityManager,
		//DISEntityTypeMapping:         DISEntityTypeMapping,
		DirectionalLight:             DirectionalLight,
		Disk2D:                       Disk2D,
		//DoubleAxisHingeJoint:         DoubleAxisHingeJoint,
		EaseInEaseOut:                EaseInEaseOut,
		ElevationGrid:                ElevationGrid,
		//EspduTransform:               EspduTransform,
		ExplosionEmitter:             ExplosionEmitter,
		Extrusion:                    Extrusion,
		//FillProperties:               FillProperties,
		//FloatVertexAttribute:         FloatVertexAttribute,
		Fog:                          Fog,
		//FogCoordinate:                FogCoordinate,
		FontStyle:                    FontStyle,
		ForcePhysicsModel:            ForcePhysicsModel,
		//GeneratedCubeMapTexture:      GeneratedCubeMapTexture,
		GeoCoordinate:                GeoCoordinate,
		GeoElevationGrid:             GeoElevationGrid,
		GeoLOD:                       GeoLOD,
		GeoLocation:                  GeoLocation,
		GeoMetadata:                  GeoMetadata,
		GeoOrigin:                    GeoOrigin,
		GeoPositionInterpolator:      GeoPositionInterpolator,
		GeoProximitySensor:           GeoProximitySensor,
		GeoTouchSensor:               GeoTouchSensor,
		GeoTransform:                 GeoTransform,
		GeoViewpoint:                 GeoViewpoint,
		Group:                        Group,
		//HAnimDisplacer:               HAnimDisplacer,
		//HAnimHumanoid:                HAnimHumanoid,
		//HAnimJoint:                   HAnimJoint,
		//HAnimSegment:                 HAnimSegment,
		//HAnimSite:                    HAnimSite,
		//ImageCubeMapTexture:          ImageCubeMapTexture,
		ImageTexture:                 ImageTexture,
		//ImageTexture3D:               ImageTexture3D,
		IndexedFaceSet:               IndexedFaceSet,
		IndexedLineSet:               IndexedLineSet,
		IndexedQuadSet:               IndexedQuadSet,
		IndexedTriangleFanSet:        IndexedTriangleFanSet,
		IndexedTriangleSet:           IndexedTriangleSet,
		IndexedTriangleStripSet:      IndexedTriangleStripSet,
		Inline:                       Inline,
		IntegerSequencer:             IntegerSequencer,
		IntegerTrigger:               IntegerTrigger,
		KeySensor:                    KeySensor,
		LOD:                          LOD,
		Layer:                        Layer,
		LayerSet:                     LayerSet,
		Layout:                       Layout,
		LayoutGroup:                  LayoutGroup,
		LayoutLayer:                  LayoutLayer,
		//LinePickSensor:               LinePickSensor,
		LineProperties:               LineProperties,
		LineSet:                      LineSet,
		LoadSensor:                   LoadSensor,
		LocalFog:                     LocalFog,
		Material:                     Material,
		//Matrix3VertexAttribute:       Matrix3VertexAttribute,
		//Matrix4VertexAttribute:       Matrix4VertexAttribute,
		MetadataBoolean:              MetadataBoolean,
		MetadataDouble:               MetadataDouble,
		MetadataFloat:                MetadataFloat,
		MetadataInteger:              MetadataInteger,
		MetadataSet:                  MetadataSet,
		MetadataString:               MetadataString,
		//MotorJoint:                   MotorJoint,
		MovieTexture:                 MovieTexture,
		//MultiTexture:                 MultiTexture,
		//MultiTextureCoordinate:       MultiTextureCoordinate,
		//MultiTextureTransform:        MultiTextureTransform,
		NavigationInfo:               NavigationInfo,
		Normal:                       Normal,
		NormalInterpolator:           NormalInterpolator,
		//NurbsCurve:                   NurbsCurve,
		//NurbsCurve2D:                 NurbsCurve2D,
		//NurbsOrientationInterpolator: NurbsOrientationInterpolator,
		//NurbsPatchSurface:            NurbsPatchSurface,
		//NurbsPositionInterpolator:    NurbsPositionInterpolator,
		//NurbsSet:                     NurbsSet,
		//NurbsSurfaceInterpolator:     NurbsSurfaceInterpolator,
		//NurbsSweptSurface:            NurbsSweptSurface,
		//NurbsSwungSurface:            NurbsSwungSurface,
		//NurbsTextureCoordinate:       NurbsTextureCoordinate,
		//NurbsTrimmedSurface:          NurbsTrimmedSurface,
		OrientationChaser:            OrientationChaser,
		OrientationDamper:            OrientationDamper,
		OrientationInterpolator:      OrientationInterpolator,
		OrthoViewpoint:               OrthoViewpoint,
		//PackagedShader:               PackagedShader,
		ParticleSystem:               ParticleSystem,
		//PickableGroup:                PickableGroup,
		PixelTexture:                 PixelTexture,
		//PixelTexture3D:               PixelTexture3D,
		PlaneSensor:                  PlaneSensor,
		PointEmitter:                 PointEmitter,
		PointLight:                   PointLight,
		//PointPickSensor:              PointPickSensor,
		PointSet:                     PointSet,
		Polyline2D:                   Polyline2D,
		PolylineEmitter:              PolylineEmitter,
		Polypoint2D:                  Polypoint2D,
		PositionChaser:               PositionChaser,
		PositionChaser2D:             PositionChaser2D,
		PositionDamper:               PositionDamper,
		PositionDamper2D:             PositionDamper2D,
		PositionInterpolator:         PositionInterpolator,
		PositionInterpolator2D:       PositionInterpolator2D,
		//PrimitivePickSensor:          PrimitivePickSensor,
		//ProgramShader:                ProgramShader,
		ProximitySensor:              ProximitySensor,
		QuadSet:                      QuadSet,
		//ReceiverPdu:                  ReceiverPdu,
		Rectangle2D:                  Rectangle2D,
		//RigidBody:                    RigidBody,
		//RigidBodyCollection:          RigidBodyCollection,
		ScalarChaser:                 ScalarChaser,
		ScalarDamper:                 ScalarDamper,
		ScalarInterpolator:           ScalarInterpolator,
		ScreenFontStyle:              ScreenFontStyle,
		ScreenGroup:                  ScreenGroup,
		Script:                       Script,
		ShaderPart:                   ShaderPart,
		//ShaderProgram:                ShaderProgram,
		Shape:                        Shape,
		//SignalPdu:                    SignalPdu,
		//SingleAxisHingeJoint:         SingleAxisHingeJoint,
		//SliderJoint:                  SliderJoint,
		Sound:                        Sound,
		Sphere:                       Sphere,
		SphereSensor:                 SphereSensor,
		SplinePositionInterpolator:   SplinePositionInterpolator,
		SplinePositionInterpolator2D: SplinePositionInterpolator2D,
		SplineScalarInterpolator:     SplineScalarInterpolator,
		SpotLight:                    SpotLight,
		SquadOrientationInterpolator: SquadOrientationInterpolator,
		StaticGroup:                  StaticGroup,
		//StringSensor:                 StringSensor,
		SurfaceEmitter:               SurfaceEmitter,
		Switch:                       Switch,
		TexCoordChaser2D:             TexCoordChaser2D,
		TexCoordDamper2D:             TexCoordDamper2D,
		Text:                         Text,
		TextureBackground:            TextureBackground,
		TextureCoordinate:            TextureCoordinate,
		TextureCoordinate3D:          TextureCoordinate3D,
		TextureCoordinate4D:          TextureCoordinate4D,
		//TextureCoordinateGenerator:   TextureCoordinateGenerator,
		TextureProperties:            TextureProperties,
		TextureTransform:             TextureTransform,
		TextureTransform3D:           TextureTransform3D,
		TextureTransformMatrix3D:     TextureTransformMatrix3D,
		TimeSensor:                   TimeSensor,
		TimeTrigger:                  TimeTrigger,
		//TouchGroup:                   TouchGroup,
		TouchSensor:                  TouchSensor,
		Transform:                    Transform,
		TransformSensor:              TransformSensor,
		//TransmitterPdu:               TransmitterPdu,
		TriangleFanSet:               TriangleFanSet,
		TriangleSet:                  TriangleSet,
		TriangleSet2D:                TriangleSet2D,
		TriangleStripSet:             TriangleStripSet,
		TwoSidedMaterial:             TwoSidedMaterial,
		//UniversalJoint:               UniversalJoint,
		Viewpoint:                    Viewpoint,
		ViewpointGroup:               ViewpointGroup,
		Viewport:                     Viewport,
		VisibilitySensor:             VisibilitySensor,
		VolumeEmitter:                VolumeEmitter,
		//VolumePickSensor:             VolumePickSensor,
		WindPhysicsModel:             WindPhysicsModel,
		WorldInfo:                    WorldInfo,
	};

	function createInstance (executionContext) { return new this (executionContext); }

	for (var name in supportedNodes)
		supportedNodes [name] .createInstance = createInstance .bind (supportedNodes [name]);

	return supportedNodes;
});

