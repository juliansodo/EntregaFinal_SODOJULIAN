import { Skeleton } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'

export function StraightSkeleton({widthSkeleton, heightSkeleton, animationSkeleton, ...rest}) {

  return (
    <View className='flex justify-center items-center'>
        <Skeleton width={widthSkeleton} height={heightSkeleton} animation={animationSkeleton} {...rest} />

    </View>
  )
}
