type Tok = { t: string; c?: 'key' | 'str' | 'fn' | 'com' | 'punc' };

export const codeSamples: Record<
  string,
  { title: string; lines: Tok[][] }
> = {
  drupal: {
    title: 'ContentResource.php',
    lines: [
      [{ t: '#[ApiResource(', c: 'fn' }, { t: 'operations: [new GetCollection()]', c: 'punc' }, { t: ')]', c: 'fn' }],
      [{ t: 'final class ', c: 'key' }, { t: 'ArticleResource' }, { t: ' {', c: 'punc' }],
      [{ t: '  public function ', c: 'key' }, { t: 'toJsonApi', c: 'fn' }, { t: '(Node $node): array {', c: 'punc' }],
      [{ t: '    return [', c: 'punc' }],
      [{ t: "      'title' => ", c: 'str' }, { t: '$node->getTitle(),' }],
      [{ t: "      'body'  => ", c: 'str' }, { t: '$node->get(' }, { t: "'body'", c: 'str' }, { t: ')->value,' }],
      [{ t: "      'tags'  => ", c: 'str' }, { t: '$this->resolveTerms($node),' }],
      [{ t: '    ];', c: 'punc' }],
      [{ t: '  }' }],
      [{ t: '}', c: 'punc' }],
    ],
  },
  nextjs: {
    title: 'Dashboard.tsx',
    lines: [
      [{ t: 'export function ', c: 'key' }, { t: 'Dashboard', c: 'fn' }, { t: '() {' }],
      [{ t: '  const ', c: 'key' }, { t: '{ data } = ' }, { t: 'useMetrics', c: 'fn' }, { t: '();' }],
      [{ t: '  return (', c: 'key' }],
      [{ t: '    <Grid' }, { t: ' cols', c: 'fn' }, { t: '={3}>' }],
      [{ t: '      {data.', c: 'punc' }, { t: 'map', c: 'fn' }, { t: '((kpi) => (' }],
      [{ t: '        <Card' }, { t: ' key', c: 'fn' }, { t: '={kpi.id}>' }],
      [{ t: '          <Counter' }, { t: ' value', c: 'fn' }, { t: '={kpi.value} />' }],
      [{ t: '        </Card>' }],
      [{ t: '      ))}', c: 'punc' }],
      [{ t: '    </Grid>' }],
      [{ t: '  );', c: 'punc' }],
      [{ t: '}' }],
    ],
  },
  java: {
    title: 'PaymentService.java',
    lines: [
      [{ t: '@Service', c: 'fn' }],
      [{ t: 'public class ', c: 'key' }, { t: 'PaymentService', c: 'fn' }, { t: ' {' }],
      [{ t: '  @Transactional', c: 'fn' }],
      [{ t: '  public ', c: 'key' }, { t: 'Mono<Receipt> ' }, { t: 'process', c: 'fn' }, { t: '(Payment p) {' }],
      [{ t: '    return ', c: 'key' }, { t: 'validate(p)' }],
      [{ t: '      .', c: 'punc' }, { t: 'flatMap', c: 'fn' }, { t: '(this::charge)' }],
      [{ t: '      .', c: 'punc' }, { t: 'doOnSuccess', c: 'fn' }, { t: '(events::emit)' }],
      [{ t: '      .', c: 'punc' }, { t: 'retryWhen', c: 'fn' }, { t: '(backoff(3));' }],
      [{ t: '  }' }],
      [{ t: '}', c: 'punc' }],
    ],
  },
  python: {
    title: 'main.py',
    lines: [
      [{ t: 'from ', c: 'key' }, { t: 'fastapi ' }, { t: 'import ', c: 'key' }, { t: 'FastAPI' }],
      [{ t: 'app = ' }, { t: 'FastAPI', c: 'fn' }, { t: '()' }],
      [{ t: '' }],
      [{ t: '@app.get', c: 'fn' }, { t: '(' }, { t: '"/metrics"', c: 'str' }, { t: ')' }],
      [{ t: 'async def ', c: 'key' }, { t: 'metrics', c: 'fn' }, { t: '() -> list[Metric]:' }],
      [{ t: '    rows = ', c: 'punc' }, { t: 'await ', c: 'key' }, { t: 'repo.' }, { t: 'fetch', c: 'fn' }, { t: '()' }],
      [{ t: '    return ', c: 'key' }, { t: '[' }, { t: 'Metric', c: 'fn' }, { t: '(**r) ' }, { t: 'for ', c: 'key' }, { t: 'r ' }, { t: 'in ', c: 'key' }, { t: 'rows]' }],
    ],
  },
};
