import { useYLSLogger } from '.';

interface Props {
  children: React.ReactNode;
  params: LogPayloadParams;
}

export const LogClick = ({ children, params }: Props) => {
  const logger = useYLSLogger();

  return <></>;
};
