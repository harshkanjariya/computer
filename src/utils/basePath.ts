const publicUrl = import.meta.env.PUBLIC_URL || '';
let basePath: string;
try {
  basePath = publicUrl ? new URL(publicUrl).pathname : '';
} catch {
  basePath = '';
}
export default basePath;