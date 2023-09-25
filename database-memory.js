import { randomUUID } from 'crypto';

export class DatabaseMemory {
  #videos = new Map();

  list(search) {
    const videosList = Array.from(this.#videos.entries())
      .map((video) => {
        const videoId = video[0];
        const data = video[1];

        return { videoId, ...data };
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search);
        }

        return true;
      });

    return videosList;
    //return Array.from(this.#videos.values());
  }

  create(video) {
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
    return video;
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
