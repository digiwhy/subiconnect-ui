import {
  formComponentsMap,
  otherComponentsMap,
} from '../../components/payroll-integration-instructions/components-map';
import { usePostPayrollIntegration } from './mutation';
import { usePayrollSystemContext } from '@/components/payroll-integration/context';
import { Loading } from '@/components/payroll-integration/loading';
import { removeUndefinedValues } from '@/lib/utils';
import { RenderMDX } from '@/mdx/render-mdx';
import { Button } from '@/ui/button';
import { Form, FormField, FormMessage } from '@/ui/form';
import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

const API_KEY_NOT_VALID =
  'Please ensure that the API key is correct and try connecting again. If the issue persists, contact us at support@subi.au';

// Mapping other components
const otherComponents = Object.keys(otherComponentsMap).reduce(
  (acc: Record<string, React.FC<any>>, key) => {
    const Component = otherComponentsMap[key];
    if (!Component)
      throw new Error(
        `Component for key "${key}" is not defined in the components map.`,
      );
    // Register each component with its name as the form field key
    acc[key] = (props: React.FC<any>) => <Component {...props} />;
    return acc;
  },
  {},
);

export type CustomPayrollIntegrationWorkflowInputs = Record<string, string>;

export type CustomPayrollIntegrationWorkflowProps = {
  onSuccess: () => void;
};

export const CustomPayrollIntegrationWorkflow: React.FC<CustomPayrollIntegrationWorkflowProps> =
  React.memo(({ onSuccess }) => {
    const { payrollSystem } = usePayrollSystemContext();
    const form = useForm<CustomPayrollIntegrationWorkflowInputs>();

    const { register, handleSubmit, setError } = form;

    const { mutateAsync, isPending } = usePostPayrollIntegration();

    const handleOnSubmit: SubmitHandler<CustomPayrollIntegrationWorkflowInputs> =
      React.useCallback(
        async (data) => {
          const finalData = removeUndefinedValues(data);

          await mutateAsync(
            {
              payrollSystemId: payrollSystem.payrollId,
              integrationParams: finalData,
            },
            {
              onSuccess: onSuccess,
              onError: () => {
                setError('root', {
                  type: 'custom',
                  message: API_KEY_NOT_VALID,
                });
              },
            },
          );
        },
        [mutateAsync],
      );

    // Mapping components with `register` to bind them to the form state
    const formComponents = React.useMemo(
      () =>
        Object.keys(formComponentsMap).reduce(
          (acc: Record<string, React.ComponentType<any>>, key) => {
            const Component = formComponentsMap[key];
            if (!Component)
              throw new Error(
                `Component for key "${key}" is not defined in the components map.`,
              );
            // Register each component with its name as the form field key
            acc[Component.displayName ?? key] = (
              props: React.ComponentType<any>,
            ) => (
              <Component {...props} {...register(key, { required: true })} />
            );
            return acc;
          },
          {},
        ),
      [register],
    );

    const components = React.useMemo(
      () => ({ ...formComponents, ...otherComponents }),
      [formComponents],
    );

    if (!payrollSystem.mdxIntegrationInstructions) {
      return <Loading title={'Instructions loading'} />;
    }

    return (
      <div
        id='subi-connect-payroll-integration-worflow'
        className='sc-h-full sc-w-full sc-p-2'
      >
        <Form {...form}>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className='sc-flex sc-flex-col sc-gap-2'
          >
            <RenderMDX
              mdxString={payrollSystem.mdxIntegrationInstructions}
              components={components}
            />

            <FormField name='root' render={() => <FormMessage />}></FormField>

            <Button type='submit' className='sc-mt-4' disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    );
  });
