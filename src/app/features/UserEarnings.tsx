import { useEffect, useState } from "react";
import styled from "styled-components";
import withBoundary from "../../core/hoc/withBoundary";
import ValueDescriptor from "../components/ValueDescriptor/ValueDescriptor";
import Skeleton from "react-loading-skeleton";
import { User, UserService } from "goodvandro-alganews-sdk";

function UserEarnings() {
  const [editorEarning, setEditorEarning] = useState<User.Detailed>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    UserService
      .getDetailedUser(7)
      .then(setEditorEarning)
      .catch(error => setError(new Error(error.message)))
  }, [])

  if (error)
    throw error

  if (!editorEarning)
    return <UserEarningsWrapper style={{ height: 123 }}>
      <Skeleton width={150} height={40} />
      <Skeleton width={150} height={40} />
      <Skeleton width={150} height={40} />
      <Skeleton width={150} height={40} />
    </UserEarningsWrapper>

  return <UserEarningsWrapper>
    <ValueDescriptor color="primary" description="Ganhos no mês" value={editorEarning?.metrics.monthlyEarnings} isCurrency />
    <ValueDescriptor color="primary" description="Ganhos na semana" value={editorEarning?.metrics.weeklyEarnings} isCurrency />
    <ValueDescriptor color="default" description="Ganhos de sempre" value={editorEarning?.metrics.lifetimeEarnings} isCurrency />
    <ValueDescriptor color="default" description="Total de palavras" value={editorEarning?.metrics.lifetimeWords} />
  </UserEarningsWrapper>
}

export default withBoundary(UserEarnings, 'ganhos do utilizador')

const UserEarningsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`