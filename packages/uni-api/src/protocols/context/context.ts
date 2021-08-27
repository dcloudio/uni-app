const validator: ProtocolOptions<String>[] = [
  {
    name: 'id',
    type: String,
    required: true,
  },
]
/* export const API_CREATE_AUDIO_CONTEXT = 'createAudioContext'
export type API_TYPE_CREATE_AUDIO_CONTEXT = typeof uni.createAudioContext
export const CreateAudioContextProtocol = validator */

export const API_CREATE_VIDEO_CONTEXT = 'createVideoContext'
export type API_TYPE_CREATE_VIDEO_CONTEXT = typeof uni.createVideoContext
export const CreateVideoContextProtocol = validator

export const API_CREATE_MAP_CONTEXT = 'createMapContext'
export type API_TYPE_CREATE_MAP_CONTEXT = typeof uni.createMapContext
export const CreateMapContextProtocol = validator

export const API_CREATE_CANVAS_CONTEXT = 'createCanvasContext'
export type API_TYPE_CREATE_CANVAS_CONTEXT = typeof uni.createCanvasContext
export const CreateCanvasContextProtocol: ProtocolOptions<String | Object>[] = [
  {
    name: 'canvasId',
    type: String,
    required: true,
  },
  {
    name: 'componentInstance',
    type: Object,
  },
]

export const API_CREATE_INNER_AUDIO_CONTEXT = 'createInnerAudioContext'
export type API_TYPE_CREATEE_INNER_AUDIO_CONTEXT =
  typeof uni.createInnerAudioContext

export const API_CREATE_LIVE_PUSHER_CONTEXT = 'createLivePusherContext'
export type API_TYPE_CREATE_LIVE_PUSHER_CONTEXT = (
  id: string,
  componentInstance: any
) => ReturnType<typeof uni.createLivePusherContext> | void
export const CreateLivePusherContextProtocol = validator.concat({
  name: 'componentInstance',
  type: Object,
})
