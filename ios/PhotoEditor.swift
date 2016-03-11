//
//  PhotoEditor.swift
//  Insta
//
//  Created by Bartosz Krawczyk on 27.01.2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation

@objc(PhotoEditor)
class PhotoEditor : NSObject {
  
  /*
   * Cropp UIImage to square -> UIImage
   */
  private func cropToSquare(image originalImage: UIImage) -> UIImage {
    let contextImage: UIImage = UIImage(CGImage: originalImage.CGImage!)
    let contextSize: CGSize = contextImage.size
    
    let posX: CGFloat
    let posY: CGFloat
    let width: CGFloat
    let height: CGFloat
    
    if contextSize.width > contextSize.height {
      posX = ((contextSize.width - contextSize.height) / 2)
      posY = 0
      width = contextSize.height
      height = contextSize.height
    } else {
      posX = 0
      posY = ((contextSize.height - contextSize.width) / 2)
      width = contextSize.width
      height = contextSize.width
    }
    
    let rect: CGRect = CGRectMake(posX, posY, width, height)
    
    let imageRef: CGImageRef = CGImageCreateWithImageInRect(contextImage.CGImage!, rect)!
    
    let image: UIImage = UIImage(CGImage: imageRef, scale: originalImage.scale, orientation: originalImage.imageOrientation)
    
    return image
  }
  
  /*
   * Resize UIImage -> UIImage
   */
  private func resizeImage(image: UIImage, newWidth: CGFloat) -> UIImage {
    let scale = newWidth / image.size.width
    let newHeight = image.size.height * scale
    UIGraphicsBeginImageContext(CGSizeMake(newWidth, newHeight))
    image.drawInRect(CGRectMake(0, 0, newWidth, newHeight))
    let newImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    
    return newImage
  }

  /*
   * Public
   * Process Image method -> base64
   */
  @objc func process(url: NSString, filterName: NSString, callback: (NSObject) -> ()) -> Void {
    let image = UIImage(contentsOfFile: url as String)
    let croppedImage: UIImage = cropToSquare(image: image!)
    let resizedImage: UIImage = resizeImage(croppedImage, newWidth: 600)
    
    let extractor = PixelExtractor()
    extractor.load(resizedImage.CGImage!)
    let filteredImage = extractor.applyFilter(filterName as String)
    
    let thumbImage: UIImage = resizeImage(filteredImage, newWidth: 150)
    
    let imageData = UIImagePNGRepresentation(filteredImage)
    let imageDataThumb = UIImagePNGRepresentation(thumbImage)
    
    
    callback( [[
      "base64": imageData!.base64EncodedStringWithOptions(.Encoding64CharacterLineLength),
      "thumb": imageDataThumb!.base64EncodedStringWithOptions(.Encoding64CharacterLineLength)
    ]])
  }
  
  @objc func filters(url: NSString, callback: (NSObject) -> ()) -> Void {
    let image = UIImage(contentsOfFile: url as String)
    let croppedImage: UIImage = cropToSquare(image: image!)
    let resizedImage: UIImage = resizeImage(croppedImage, newWidth: 350)
    
    let extractor = PixelExtractor();
    extractor.load(resizedImage.CGImage!)
    
    let f0 = extractor.applyFilter("0" as String)
    let f1 = extractor.applyFilter("1" as String)
    let f2 = extractor.applyFilter("2" as String)
    let f3 = extractor.applyFilter("3" as String)
    let f4 = extractor.applyFilter("4" as String)
    let f5 = extractor.applyFilter("5" as String)
    
    let f0data = UIImagePNGRepresentation(f0)
    let f1data = UIImagePNGRepresentation(f1)
    let f2data = UIImagePNGRepresentation(f2)
    let f3data = UIImagePNGRepresentation(f3)
    let f4data = UIImagePNGRepresentation(f4)
    let f5data = UIImagePNGRepresentation(f5)
    
    callback( [[
      "f0": f0data!.base64EncodedStringWithOptions(.Encoding64CharacterLineLength),
      "f1": f1data!.base64EncodedStringWithOptions(.Encoding64CharacterLineLength),
      "f2": f2data!.base64EncodedStringWithOptions(.Encoding64CharacterLineLength),
      "f3": f3data!.base64EncodedStringWithOptions(.Encoding64CharacterLineLength),
      "f4": f4data!.base64EncodedStringWithOptions(.Encoding64CharacterLineLength),
      "f5": f5data!.base64EncodedStringWithOptions(.Encoding64CharacterLineLength)
    ]])
  }
}