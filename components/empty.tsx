import Image from 'next/image'

type EmptyProps = {
  label: string
}

export const Empty = ({ label }: EmptyProps) => (
  <div className="h-full p-20 flex flex-col items-center">
    <div className="relative h-72 w-72">
      <Image src="/empty.png" loading="eager" alt="Empty" fill sizes="288px" />
    </div>
    <p className="text-muted-foreground text-sm text-center">{label}</p>
  </div>
)
