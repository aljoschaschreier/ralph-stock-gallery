"use client"

export function FullWidthShowcase() {
  return (
    <section className="px-6 py-12 lg:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Quote Container with Sticky Effect */}
        <div style={{ height: 'calc(100vh + 38px)' }}>
          <blockquote className="sticky top-20 space-y-2">
            <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground text-balance">
              "The old Chinese used to say: 'It is better to feel a painting than to look at it.' So much today is only to look at. It is one thing to paint a picture and another to experience it: in attempting to find on what level one accepts this experience, one discovers what one sees and on what level the discovery takes place. Christopher Columbus left in search of one world and discovered another."
            </p>
            <footer className="text-muted-foreground text-lg pt-1">
              — Mark Tobey
              <cite className="block text-sm mt-1 not-italic">
                Letter to Marion Willard, Whitechapel catalog, p. 15, Louvre 2
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
