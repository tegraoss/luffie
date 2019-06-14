import { useState, useEffect } from "react";
import { Observable } from "rxjs";

export function useStream<T>(stream: Observable<T>) {
  const [streamData, setStreamData] = useState<T | null>(null);

  useEffect(() => {
    const sub = stream.subscribe(data => setStreamData(data));

    return () => {
      sub.unsubscribe();
    }
  })

  return streamData;
}