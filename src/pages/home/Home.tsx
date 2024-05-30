import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getCfrItemsByParent } from "../../core/services/api.service";
import { CircularProgress } from "@mui/material";
import { CFRItem } from "../../core/model/cfr-item";
export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<CFRItem[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getCfrItemsByParent("root");
      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <div>{isLoading ? <CircularProgress /> : <p>{JSON.stringify(data)}</p>}</div>
        </Paper>
      </Grid>
    </Grid>
  );
}
