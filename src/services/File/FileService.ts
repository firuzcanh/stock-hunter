import exifr from "exifr";

export class FileService {
  async getFileMeta(file: File) {
    return await exifr.parse(file, true);
  }

  async getFileMetaDescription(file: File) {
    const meta = await this.getFileMeta(file);
    if (meta?.Description?.includes("ID_")) return meta.Description;
    return meta?.description?.value;
  }

  async readFile(file: File): Promise<FileReader["result"]> {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => reject(`File reading has failed: ${file.name}`);
      reader.onload = () => resolve(reader.result);

      reader.readAsDataURL(file);
    });
  }

  async readMultipleFile(files: File[]) {
    const list: Array<FileReader["result"]> = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      await this.readFile(file).then(list.push).catch(console.log);
    }

    return list;
  }
}
