## ZipFoundation

This directory includes the source code of libraries that are embedded within lottie-ios.

This includes:
 - ZipFoundation (https://github.com/weichsel/ZIPFoundation)
 - EpoxyCore (https://github.com/airbnb/epoxy-ios)
 - LRUCache (https://github.com/nicklockwood/LRUCache)

Lottie is distributed via multiple package managers (SPM, Cocoapods, Carthage, and NPM),
each with different packaging and compilation requirements. 

Due to limitations of these package managers, we can't depend on / import 
a separates modules / libraries. Instead, we include the source
directly within the Lottie library and compile everything as a single unit.

### Update instructions

From time to time we may need to update to a more recent version of one of these libraries.
When doing this, follow these steps:

 1. Download the latest release of the library and replace the source code in 
    the corresponding directory with the updated code.
    
 2. Update the URL in the directory's README.md to indicate what release is being used.
 
 3. Change all of the `public` symbols defined in the module to instead be `internal`
    to prevent Lottie from exposing any APIs from other libraries.

### Adding a new dependencies

 1. Create a subdirectory in `EmbeddedLibraries` for the new dependency.

 2. Add the dependency to the list at the top of this file.

 3. Add a `README.md` to the directory for the new library, using the same formatting as the `README.md` file used by other dependencies.

 4. Exclude the new `README.md` file from the lottie-ios package by adding it to the `exclude:` list in `Package.swift`.

 5. Change all of the `public` symbols defined in the module to instead be `internal`
    to prevent Lottie from exposing any APIs from other libraries.
    
 6. If the dependency provides a privacy manifest, incorporate content from that dependency's privacy manifest into Lottie's privacy manifest.
