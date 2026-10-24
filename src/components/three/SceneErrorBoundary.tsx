import { Component, type ReactNode } from "react";

/**
 * Keeps a WebGL or model-loading failure from taking the page down with it.
 * The poster image behind the canvas stays visible as the fallback.
 */
export class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("3D scene disabled:", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
