import { getEditorDescription, User, UserService } from 'goodvandro-alganews-sdk';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from "styled-components";
import Profile from "../components/Profile";

export default function EditorsList() {
  const [editors, setEditors] = useState<User.EditorSummary[]>([]);
  const [error, setError] = useState<Error>()

  useEffect(() => {
    UserService
      .getAllEditors()
      .then(setEditors)
      .catch(error => setError(new Error(error.message)))
  }, [])

  if (error)
    throw error

  if (!editors.length)
    return <EditorListWrapper>
      <Skeleton height={82} />
      <Skeleton height={82} />
      <Skeleton height={82} />
    </EditorListWrapper>

  return <EditorListWrapper>
    {
      editors.map((editor: User.EditorSummary) => {
        return <Profile
          key={editor.id}
          editorId={editor.id}
          name={editor.name}
          description={getEditorDescription(new Date(editor.createdAt))}
          avatarUrl={editor.avatarUrls.small}
        />
      })
    }
  </EditorListWrapper>
}

const EditorListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`