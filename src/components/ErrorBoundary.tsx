import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("FeedMe error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="text-center max-w-md">
            <span className="text-6xl block mb-4">🍜</span>
            <h1 className="font-display text-2xl font-bold mb-3">
              Oups, quelque chose s'est mal passe
            </h1>
            <p className="text-muted-foreground mb-6">
              FeedMe a rencontre un probleme. Rechargez la page pour continuer.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center h-12 px-8 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-glow-primary hover:scale-105 transition-transform"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
