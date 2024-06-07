'use client';

import { cn } from '@/lib/utils';
import { useAuthenticationAuthenticatedContext } from 'context/authentication';
import { useEffect, useState } from 'react';
import { CodeBlock } from 'react-code-block';

const codeTemplate = `const connectionFn = async ({referenceId, name}: {referenceId: string, name: string}) => {
  const response = await fetch(
    '${process.env.NEXT_PUBLIC_BASE_API_URL}authentication/company-access-token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key'
      },
      body: JSON.stringify({
        company: {
          referenceId: referenceId,   // E.g. 'world-pay-demo-referenceId-1'
          name: name                  // E.g. 'Demo Company'
        }
      })
    }
  );
  const result = await response.json();
  return result.accessToken;
};

const SubiConnectProviderWrapper = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <SubiConnectProvider connectionFn={connectionFn}>
      {children}
    </SubiConnectProvider>
  );
};

export default SubiConnectProviderWrapper;`;

const clientComponent = `'use client';

import { SubiConnectProvider } from '@subifinancial/subi-connect';
import { useCallback } from 'react';
import { connectionFn } from '@/lib/connection-fn';

const SubiConnectProviderWrapper = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const {data: company} = useYourCompanyHook();
  const completeConnectionFn = useCallback(async () => {
    return await connectionFn(company);
  }, [company]);

  return (
    <SubiConnectProvider connectionFn={completeConnectionFn}>
      {children}
    </SubiConnectProvider>
  );
};

export default SubiConnectProviderWrapper;

`;

const APIKeyInput = ({
  hide,
  apiKey,
  setApiKey
}: {
  hide: boolean;
  apiKey: string;
  setApiKey: (value: string) => void;
}) => {
  if (hide && apiKey !== '') {
    return 'process.env.YOUR_API_KEY as string';
  }
  return (
    <div className="inline-flex h-full text-xs">
      <input
        placeholder="Enter your API Key"
        type="text"
        className={cn(
          'flex h-10 w-full rounded-md px-1 py-2 text-sm w-80 bg-transparent h-4 border border-border outline-none'
        )}
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      {apiKey === '' && ' <- your API Key goes here!'}
    </div>
  );
};

const API_KEY_LINE = 8;

const SimulatedBackendCodeBlock = () => {
  const { apiKey, setApiKey } = useAuthenticationAuthenticatedContext();
  const [hide, setHide] = useState<boolean>(true);
  const [localApi, setLocalApi] = useState<string>(apiKey);

  useEffect(() => {
    if (hide && localApi !== apiKey) {
      setApiKey(localApi);
    }
  }, [hide]);

  const handleHoverOn = () => setHide(false);
  const handleHoverOff = () => setHide(true);

  return (
    <div className="flex flex-col gap-10">
      <CodeBlock
        code={codeTemplate}
        language={'ts'}
        lines={[API_KEY_LINE]}
        words={[`'x-api-key'`]}
      >
        <div
          className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg"
          onMouseEnter={handleHoverOn}
          onMouseLeave={handleHoverOff}
        >
          <div className="text-sm text-gray-400 px-6 py-4">
            connection-fn.ts
          </div>

          <CodeBlock.Code className="!px-0 text-sm">
            {({ isLineHighlighted, lineNumber }) => (
              <div
                className={`table-row flex items-center ${
                  isLineHighlighted && apiKey ? 'bg-emerald-400/25' : ''
                }`}
              >
                <div
                  className={`table-cell px-4 text-emerald-400 select-none ${
                    isLineHighlighted && apiKey ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {'\u2713'}
                </div>
                <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                {lineNumber === API_KEY_LINE ? (
                  <CodeBlock.LineContent className="table-cell w-full pr-6 max-h-6">
                    <CodeBlock.Token>
                      {({ isTokenHighlighted, children }) => {
                        return (
                          <span>
                            {children}
                            {isTokenHighlighted ? (
                              <span className="flex-nowrap">
                                :{' '}
                                <APIKeyInput
                                  hide={hide}
                                  apiKey={localApi}
                                  setApiKey={setLocalApi}
                                />
                              </span>
                            ) : null}
                          </span>
                        );
                      }}
                    </CodeBlock.Token>
                  </CodeBlock.LineContent>
                ) : (
                  <CodeBlock.LineContent className="table-cell w-full pr-6">
                    <CodeBlock.Token />
                  </CodeBlock.LineContent>
                )}
              </div>
            )}
          </CodeBlock.Code>

          <div className="text-sm text-gray-400 px-6 pb-4 text-right uppercase select-none">
            ts
          </div>
        </div>
      </CodeBlock>

      <CodeBlock code={clientComponent} language={'tsx'}>
        <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg">
          <div className="text-sm text-gray-400 px-6 py-4">
            subi-connect-wrapper.tsx
          </div>

          <CodeBlock.Code className="!px-0 text-sm">
            {({ isLineHighlighted, lineNumber }) => (
              <div
                className={`table-row flex items-center ${
                  isLineHighlighted && apiKey ? 'bg-emerald-400/25' : ''
                }`}
              >
                <div
                  className={`table-cell px-4 text-emerald-400 select-none ${
                    isLineHighlighted && apiKey ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {'\u2713'}
                </div>
                <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                <CodeBlock.LineContent className="table-cell w-full pr-6">
                  <CodeBlock.Token />
                </CodeBlock.LineContent>
              </div>
            )}
          </CodeBlock.Code>

          <div className="text-sm text-gray-400 px-6 pb-4 text-right uppercase select-none">
            tsx
          </div>
        </div>
      </CodeBlock>
    </div>
  );
};

export default SimulatedBackendCodeBlock;
