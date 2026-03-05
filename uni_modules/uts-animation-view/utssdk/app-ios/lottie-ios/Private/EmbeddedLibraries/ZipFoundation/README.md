## ZipFoundation

This directory includes the source code of the ZIPFoundation library, from the following release:
https://github.com/weichsel/ZIPFoundation/releases/tag/0.9.16

Lottie is distributed via multiple package managers (SPM, Cocoapods, Carthage, and NPM),
each with different packaging and compilation requirements. 

Due to limitations of these package managers, we can't depend on / import 
a separate ZIPFoundation module / library. Instead, we include the source
directly within the Lottie library and compile everything as a single unit.

### Update instructions

From time to time we may need to update to a more recent version of ZIPFoundation.
When doing this, follow these steps:

 1. Download the latest release from https://github.com/weichsel/ZIPFoundation
    and replace the source code in this directory with the updated code.
    
 2. Update the URL at the top of this file to indicate what release is being used.
 
 3. Change all of the `public` symbols defined in this module to instead be `internal`
    to prevent Lottie from exposing any ZIPFoundation APIs.
