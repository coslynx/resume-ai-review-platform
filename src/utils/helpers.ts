/**
 * Formats a file size in bytes into a human-readable string.
 *
 * @param {number} size - The file size in bytes.
 * @returns {string} A human-readable string representation of the file size (e.g., "1.2 MB"). Returns an empty string for invalid input.
 *
 * @example
 * formatFileSize(1024); // Returns "1.0 KB"
 * formatFileSize(1572864); // Returns "1.5 MB"
 * formatFileSize(2147483648); // Returns "2.0 GB"
 */
export const formatFileSize = (size: number): string => {
  if (typeof size !== 'number' || size < 0) {
    return '';
  }

  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (size < KB) {
    return `${size} bytes`;
  } else if (size < MB) {
    return `${(size / KB).toFixed(1)} KB`;
  } else if (size < GB) {
    return `${(size / MB).toFixed(1)} MB`;
  } else {
    return `${(size / GB).toFixed(1)} GB`;
  }
};

/**
 * Validates if a file's MIME type is within an allowed list.
 *
 * @param {string} fileType - The MIME type of the file.
 * @param {string[]} allowedTypes - An array of allowed MIME types.
 * @returns {boolean} True if the file type is allowed, false otherwise. Returns false for invalid input.
 *
 * @example
 * validateFileType('application/pdf', ['application/pdf', 'image/jpeg']); // Returns true
 * validateFileType('image/png', ['application/pdf', 'image/jpeg']); // Returns false
 */
export const validateFileType = (fileType: string | null, allowedTypes: string[]): boolean => {
  if (!fileType || typeof fileType !== 'string' || !Array.isArray(allowedTypes) || allowedTypes.some(type => typeof type !== 'string')) {
    return false;
  }
    
  return allowedTypes.some(allowedType => allowedType.toLowerCase() === fileType.toLowerCase());
};

/**
 * Truncates a string to a specified maximum length, adding "..." if truncated.
 *
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {string} The truncated string, or the original string if it's within the maxLength.
 * Returns an empty string for null or undefined string input.
 *
 * @example
 * truncateString('This is a long string', 10); // Returns "This is a..."
 * truncateString('Short', 10); // Returns "Short"
 */
export const truncateString = (str: string | null, maxLength: number): string => {
    if (str == null || typeof str !== 'string') {
      return '';
    }
    
    if (typeof maxLength !== 'number' || maxLength < 0) {
      return str;
    }
  
    if (str.length <= maxLength) {
      return str;
    }
  
    return `${str.slice(0, maxLength)}...`;
};