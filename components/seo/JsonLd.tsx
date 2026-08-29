/**
 * Renders a JSON-LD graph into the document.
 *
 * The `<` escape is not decoration: a script block ends at the first literal
 * `</script>` the HTML parser sees, wherever it appears — including inside
 * what we think is a JSON string. Escaping every `<` to its < form keeps
 * the JSON byte-identical to a parser while making that sequence
 * unrepresentable, so no dictionary string can ever break out of the tag.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
