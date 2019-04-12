import * as React from 'react';
import { useState, useEffect } from 'react';
import { TStream } from './interfaces/plug';

export const plug = <T extends {}>(stream: TStream) => (WrappedComponent: any) => (props: T) => {
  const [hasEmmited, setHasEmitted] = useState(false);
  const [innerData, setInnerData] = useState({});

  useEffect(() => {
    const streamSubscription = stream(props)
      .subscribe((data: any) => {
        setHasEmitted(true);
        setInnerData(data);
      });

    return () => {
      streamSubscription.unsubscribe();
    }
  }, [])

  if (hasEmmited) {
    return <WrappedComponent {...innerData} />;
  }

  return null;
}
