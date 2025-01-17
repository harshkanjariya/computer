const publicUrl = import.meta.env.PUBLIC_URL || 'https://harshkanjariya.xyz/computer';
let basePath: string;
try {
  basePath = publicUrl ? new URL(publicUrl).pathname : '';
} catch {
  basePath = '';
}
export default basePath;