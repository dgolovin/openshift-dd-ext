import { useEffect, useState } from 'react';
import { loadKubeContext } from './utils/OcUtils';
import { Card, CardHeader, CardContent, IconButton, List, ListItem, ListItemText, Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { UnknownKubeContext } from './models/KubeContext';
import { openInBrowser } from './utils/UIUtils';
import { LoginDialog } from './dialogs/login';
import { ChangeContext } from './dialogs/changeContext';
import { EditRounded } from '@mui/icons-material';
import { LoginRounded } from '@mui/icons-material';
import { ChangeProject } from './dialogs/changeProject';

export function CurrentContext() {
  const [loading, setLoading] = useState(true);
  const [currentContext, setCurrentContext] = useState(UnknownKubeContext);
  const [expanded, setExpanded] = useState(false);

  const handleLogin = () => {
    showLoginDialog();
  };

  const handleChangeContext = async () => {
    showChangeContextDialog();
    await loadContext();
  };

  const handleChangeProject = () => {
    showChangeProjecDialog();
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  }

  let showLoginDialog: () => void;
  let loginDialogClosed: (value: string) => void;
  let showChangeContextDialog: () => void;
  let showChangeProjecDialog: () => void;

  const installDialog = (showDialogHandler: () => void) => {
    showLoginDialog = showDialogHandler;
  }

  const installChangeContextDialog = (showDialogHandler: () => void) => {
    showChangeContextDialog = showDialogHandler;
  }

  const installChangeProjectDialog = (showDialogHandler: () => void) => {
    showChangeProjecDialog = showDialogHandler;
  }

  async function loadContext(): Promise<void> {
    const context = await loadKubeContext();
    setCurrentContext(context);
  }

  const onLogin = () => {
    loadContext();
  }

  useEffect(() => {
    if (loading) {
      loadContext();
    }
  }, []);

  function openClusterPage() {
    if (currentContext.clusterUrl) {
      openInBrowser(currentContext.clusterUrl);
    }
  }

  const styles = {
    link: {
      color: '#00bcd4',
    }
  }

  return (
    <>
      <Card>
        <CardHeader
          action={
            <>
              <IconButton
                aria-label="action"
                onClick={handleLogin}>
                <LoginRounded />
              </IconButton>
              <IconButton
                aria-label="action"
                onClick={handleChangeContext}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleExpand}>
                {(expanded) && (
                  <ExpandLessRounded />
                )}
                {(!expanded) && (
                  <ExpandMoreRounded />
                )}
              </IconButton>
            </>
          }
          title={
            currentContext.name
          }
          subheader="Current context"
        />
        <CardContent hidden={!expanded} sx={{ paddingTop: "0px" }}>
          <Box>Server: <a onClick={openClusterPage} href="" style={styles.link}>{currentContext.clusterUrl}</a></Box>
          <Box>User: {currentContext.user}</Box>
          <Box>Project: {currentContext.project} <Button sx={{ padding: 0 }} size="small" onClick={handleChangeProject}>Change</Button></Box>
        </CardContent>
      </Card >
      <LoginDialog install={installDialog} onLogin={onLogin} />
      <ChangeContext install={installChangeContextDialog} onContextChange={loadContext} />
      <ChangeProject install={installChangeProjectDialog} onProjectChange={loadContext} />
    </>
  );
}