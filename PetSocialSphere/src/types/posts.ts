interface Attachment {
    type: "image" | "video"; // You can extend this if needed
    fileName: string;
  }
  
  interface Comment {
    user: string; // User ID
    text: string;
    timestamp: Date;
  }
  
  interface PostData {
    _id: string;
    user: string; // User ID
    content: string;
    attachments: Attachment[];
    visibility: "public" | "private" | "friends-only";
    likes: number;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface PostCreationResponse {
    status: string;  // "success"
    message: string; // "Post created successfully"
    data: PostData;
  }