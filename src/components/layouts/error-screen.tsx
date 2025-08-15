interface ErrorScreenProps {
  code: string | number;
  message: string;
}

export function ErrorScreen({ code, message }: ErrorScreenProps) {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Error code - big but muted to blend with background */}
        <div className="text-muted-foreground/30 mb-4 font-mono text-8xl font-light">{code}</div>

        {/* Error message */}
        <h2 className="text-foreground mb-2 text-xl font-medium">Something went wrong</h2>
        <p className="text-muted-foreground leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
