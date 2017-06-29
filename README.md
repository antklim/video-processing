# video-processing

[ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) package used to process video.

## Usage
Thumbnails creation:
```
$ node index.js thumbnails path/to/video path/for/thumbnails
```

Thumbnails will be saved at every second of the video at 50% quality.  
Naming pattern is '<startedAt>-from-%b-%00i.png' where:
- <startedAt> processing start timestamp
- %b video file name without extension
- %00i zero-padded index of thumbnail

Video size reduction:
```
$ node index.js reduce path/to/video path/to/new-video
```
