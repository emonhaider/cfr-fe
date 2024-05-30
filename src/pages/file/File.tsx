import { Box, LinearProgress, Link } from "@mui/material";
import { useState } from "react";
import { getDownloadSignedUrl } from "../../core/services/api.service";

export default function File() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const downloadFile = () => {
    const downloadFile = async () => {
      setIsLoading(true);
      const signedUrl = await getDownloadSignedUrl();

      const link = document.createElement("a");
      link.href = signedUrl.url;
      link.download = `${signedUrl.key}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(signedUrl);
      setIsLoading(false);
    };
    setIsLoading(true);
    downloadFile();
  };

  return (
    <div>
      {isLoading && (
        <>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </>
      )}
      <Link underline="hover" color="inherit" onClick={() => downloadFile()}>
        Download File
      </Link>
    </div>
  );
}
