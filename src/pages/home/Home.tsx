import { useCallback, useEffect, useState } from "react";
import { getCfrItemsByParent } from "../../core/services/api.service";
import {
  Avatar,
  Breadcrumbs,
  CircularProgress,
  Link,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { CFRItem } from "../../core/model/cfr-item";
export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<CFRItem[] | null>(null);
  const [parentId, setParentId] = useState<string>("root");
  const [previousParentId, setPreviousParentId] = useState<string>("root");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getCfrItemsByParent(parentId);
      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [parentId]);

  const handleClick = useCallback((cfrItem: CFRItem) => {
    console.log(cfrItem.id);
    setParentId(cfrItem.id);
    setPreviousParentId(cfrItem.parentId ?? "root");
  }, []);

  const navigateUp = (id: string) => {
    setParentId(id);
  };

  function ItemCard(props: { cfrItem: CFRItem }) {
    return (
      <List key={props.cfrItem.id} sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItemButton onClick={() => handleClick(props.cfrItem)}>
          <ListItemAvatar>
            <Avatar>{props.cfrItem.name?.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={props.cfrItem.name}
            secondary={
              <>
                <Typography variant="body2" color="text.secondary">
                  {props.cfrItem.type}&nbsp;
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {props.cfrItem.data}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {JSON.stringify(props.cfrItem.attribs)}
                </Typography>
              </>
            }
          />
        </ListItemButton>
      </List>
    );
  }
  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" onClick={() => navigateUp("root")}>
              Root
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigateUp(previousParentId)}>
              Up
            </Link>
          </Breadcrumbs>
          {data && data.length > 0 ? data?.map((i) => <ItemCard cfrItem={i} key={i.id} />) : "No children"}
        </>
      )}
    </div>
  );
}
