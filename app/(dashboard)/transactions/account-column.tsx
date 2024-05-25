import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

type AccountColumnProps = {
  account: string;
  accountId: string;
};

export const AccountColumn = ({ account, accountId }: AccountColumnProps) => {
  const { onOpen } = useOpenAccount();

  const onClick = () => {
    onOpen(accountId);
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </button>
  );
};
