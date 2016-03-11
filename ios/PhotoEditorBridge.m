//
//  PhotoEditorBridge.m
//  Insta
//
//  Created by Bartosz Krawczyk on 27.01.2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(PhotoEditor, NSObject)

RCT_EXTERN_METHOD(process:(NSString *)url filterName:(NSString *)filterName callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(filters:(NSString *)url callback:(RCTResponseSenderBlock)callback)

@end
