export function getFileType(fileBase64: string): 'image' | 'video' | undefined {
    if (fileBase64.startsWith('data:image')) {
        return 'image';
    } else if (fileBase64.startsWith('data:video')) {
        return 'video';
    }

    return undefined;
}