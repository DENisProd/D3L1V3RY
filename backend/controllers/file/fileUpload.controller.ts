import { FastifyReply, FastifyRequest } from "fastify";
import mediaService from "../../services/media/media.service";
import { UserRole, File, FileType } from "@prisma/client";
import { FileChangeStatusInput, FileChangeStatusInput2, FileUploadInput } from "../../routes/file/fileUploader.schema";
import imageService from "../../services/media/image.service";
import { getFileType } from "../../utils/fileType";
import { checkAdminRole } from "../../plugins/authenticate.middleware";
import userService from "../../services/user/user.service";

export enum EFileType {
    IMAGE = "image",
    VIDEO = "video",
}

export interface IError {
    success: boolean;
    message?: string;
    item?: File;
}

async function uploadFile(request: FastifyRequest<{ Body: FileUploadInput, Params: { agentProfileId: number } }>, reply: FastifyReply) {
    // try {
    //     const user = (request as any).user;
    //     if (!user) return reply.send({ success: false, message: 'forbidden'] });
    //     const { agentProfileId } = request.params;
    //     const { file, type, mime, isPublic } = request.body;

    //     const fileType = getFileType(mime);

    //     if (!file) return reply.send({ success: false, message: "Файл отсутствует" });

    //     let url: string = null;
    //     let response: IError = null;
    //     if (fileType === EFileType.IMAGE) {
    //         url = await imageService.uploadProfileImage({ image: file, userId: agentProfileId });

    //         if (type === FileType.PHOTO) {
    //             const photo = await mediaService.create({
    //                 url: url,
    //                 size: 1,
    //                 type: FileType.PHOTO,
    //                 authorId: +user?.userId,
    //                 isPublic,
    //             });
    //             return reply.send({ success: true, item: photo });
    //         }
    //     } else {
    //         const document = await mediaService.create({
    //             url: url,
    //             size: 1,
    //             type: FileType.PHOTO,
    //             authorId: +user?.userId,
    //             isPublic,
    //         });
    //         return reply.send({ success: true, item: document });
    //     }
        
    //     return reply.send({ success: false, message: "Неподдерживаемый тип файла" });
    // } catch (err) {
    //     console.error("Error during file upload:", err);
    //     return reply.send({ success: false, message: "Ошибка при сохранении файла" });
    // }
}

async function deleteFile(request: FastifyRequest<{ Params: { id: number }, Querystring: { verif: boolean } }>, reply: FastifyReply) {
    // try {
    //     const file = await mediaService.deleteMedia(request.params.id);
    //     return reply.send({ success: !!file });
    // } catch (err) {
    //     console.log(err);
    //     reply.send({ success: false, message: "Ошибка при удалении файла" });
    // }
}

async function getMedia(request: FastifyRequest<{ Params: { id: number, name: string }, Querystring: { hash: string } }>, reply: FastifyReply) {
    // try {
    //     const { id, name } = request.params;
    //     const hash = request.query.hash;
    //     const user = await clientService.getByHash(hash);
    //     const media = await mediaService.getMedia(+id, name, user);

    //     if (media) {
    //         if (media?.file?.author?.agentId === +user?.id) {
    //             // console.log('is author')
    //         }
    //         else if (media?.file?.isPublic) {
    //             // console.log('is public')
    //         }
    //         else if (user?.role === ClientRole.ROOT) {
    //             // console.log('is admin')
    //         }
    //         else {
    //             // console.log("forbidden")
    //             return reply.send({ success: false, message: ru_locale[EServerMessage.FORBIDDEN] });
    //         }
    //     }
    //     // if (media.file?.author?.)

    //     if (!media?.stream || !media?.file) return reply.send({ success: false, message: "Файл не найден" });
    //     const { stream, file } = media;

    //     const ext = name.split(".").pop();
    //     let type = "";
    //     if (file.type.includes("VIDEO")) type = "video/mp4";
    //     else type = "image/webp";
    //     return reply.type(type).send(stream);
    // } catch (e) {
    //     console.log(e);
    //     return reply.send({ success: false, message: "Ошибка при получении статуса" });
    // }
}

export default {
    uploadFile,
    getMedia,
    deleteFile,
};
