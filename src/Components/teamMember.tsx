interface TeamMemberProps {
  name: string;
  role: string;
}

export default function UnderlineHeader({ name, role }: TeamMemberProps) {
  return (
    <div>
      <div>{name}</div>
    </div>
  );
}
