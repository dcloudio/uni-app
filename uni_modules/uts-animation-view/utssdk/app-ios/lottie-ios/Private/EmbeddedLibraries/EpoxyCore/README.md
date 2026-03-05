## EpoxyCore

This directory includes the source code of the EpoxyCore library, from the following release:
https://github.com/airbnb/epoxy-ios/releases/tag/0.10.0

Lottie is distributed via multiple package managers (SPM, Cocoapods, Carthage, and NPM),
each with different packaging and compilation requirements. 

Due to limitations of these package managers, we can't depend on / import 
a separate EpoxyCore module / library. Instead, we include the source
directly within the Lottie library and compile everything as a single unit.

### Update instructions

From time to time we may need to update to a more recent version of EpoxyCore.
When doing this, follow these steps:

 1. Download the latest release from https://github.com/epoxy-ios/EpoxyCore
    and replace the source code in this directory with the updated code.
    
 2. Update the URL at the top of this file to indicate what release is being used.
 
 3. Change all of the `public` symbols defined in this module to instead be `internal`
    to prevent Lottie from exposing any EpoxyCore APIs.
    
 4. Add `@available` annotations as necessary so the library compiles
    (Lottie has a lower minimum iOS version than EpoxyCore). 
    
 5. Namespace any types that conflict with other existing types.
    For example, the EpoxyCore `Entry` type conflicts with the ZipFoundation `Entry` type,
    so the EpoxyCore type has been renamed to `EpoxyEntry`.
