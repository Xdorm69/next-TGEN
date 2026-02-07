import { toast } from "sonner";

type responseType = {
  message: string;
  data: [any];
  success: boolean;
};

export class FetchHandler {
  static get = async (url: URL) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      return response.json() as Promise<responseType>;
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  static post = async (url: URL, body: any) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      return res.json() as Promise<responseType>;
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };
}
